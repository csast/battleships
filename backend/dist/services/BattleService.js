"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleService = void 0;
const index_1 = require("../storage/index");
const QueueService_1 = require("../externalServices/QueueService");
exports.BattleService = {
    queueAttack(attackData) {
        const { attackerId, defenderId } = attackData;
        const attacker = index_1.playerRepository.getById(attackerId);
        const defender = index_1.playerRepository.getById(defenderId);
        if (!attacker || !defender) {
            return { error: "Invalid ID" };
        }
        QueueService_1.messageQueueService.sendToQueue("attack_queue", { attackerId, defenderId });
        return { success: true };
    },
    async processAttackRequests() {
        await QueueService_1.messageQueueService.consume("attack_queue", (msg) => {
            if (msg) {
                try {
                    const { attackerId, defenderId } = JSON.parse(msg.content.toString());
                    const attacker = index_1.playerRepository.getById(attackerId);
                    const defender = index_1.playerRepository.getById(defenderId);
                    if (attacker && defender) {
                        const battleLog = this.processBattle(attacker, defender);
                        console.log("Battle Log:", battleLog);
                    }
                    QueueService_1.messageQueueService.getChannel()?.ack(msg);
                }
                catch (error) {
                    console.error("Error:", error);
                    QueueService_1.messageQueueService.getChannel()?.nack(msg, false, true);
                }
            }
        });
    },
    processBattle(attacker, defender) {
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
        winner.gold = Math.min(winner.gold + goldStolen, 1000000000);
        loser.gold = Math.max(loser.gold - goldStolen, 0);
        battleLog.push({ result: `${winner.name} wins`, goldStolen });
        return battleLog;
    },
    /*   calculateDamage(attacker: any, defender: any): number {
        return Math.floor(Math.random() * 20) + 1;
      } */
};
