import { playerRepository } from "../storage/index";
import { messageQueueService } from "../externalServices/QueueService";

export const BattleService = {
  queueAttack(attackData: { attackerId: number; defenderId: number }) {
    const { attackerId, defenderId } = attackData;

    const attacker = playerRepository.getById(attackerId);
    const defender = playerRepository.getById(defenderId);
    playerRepository
    if (!attacker || !defender) {
      return { error: "Invalid attacker or defender ID" };
    }

    messageQueueService.sendToQueue("attack_queue", { attackerId, defenderId });
    return { success: true };
  },

  async processAttackRequests() {
    await messageQueueService.consume("attack_queue", (msg) => {
      if (msg) {
        try {
          const { attackerId, defenderId } = JSON.parse(msg.content.toString());

          const attacker = playerRepository.getById(attackerId);
          const defender = playerRepository.getById(defenderId);

          if (attacker && defender) {
            const battleLog = this.processBattle(attacker, defender);
            console.log("Battle Log:", battleLog);
          }

          messageQueueService.getChannel()?.ack(msg);
        } catch (error) {
          console.error("Error processing attack request:", error);
          messageQueueService.getChannel()?.nack(msg, false, true);
        }
      }
    });
  },

  processBattle(attacker: any, defender: any) {
    const battleLog = [];
    let turn = 1;

    while (attacker.hp > 0 && defender.hp > 0) {
      const isCriticalMiss = Math.random() * 10 < defender.lck;
      const damage = isCriticalMiss ? 0 : Math.floor((attacker.atk * (attacker.hp / 100)));

      defender.hp = Math.max(defender.hp - damage, 0);

      battleLog.push({
        turn,
        attacker: attacker.name,
        defender: defender.name,
        damage,
        defenderHp: defender.hp,
        miss: isCriticalMiss
      });

      [attacker, defender] = [defender, attacker];
      turn++;
    }

    const winner = attacker.hp > 0 ? attacker : defender;
    const loser = attacker.hp <= 0 ? attacker : defender;
    const goldStolen = Math.floor(Math.random() * (loser.gold * 0.2 - loser.gold * 0.1) + loser.gold * 0.1);

    winner.gold = Math.min(winner.gold + goldStolen, 1_000_000_000);
    loser.gold = Math.max(loser.gold - goldStolen, 0);

    winner.totalGoldStolen += goldStolen;

    battleLog.push({ result: `${winner.name} wins`, goldStolen });

    return battleLog;
  }
};
