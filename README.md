### Battleships

## Run with
```
docker-compose up --build
```

## Backend
- Node v18.19.0 (not the latest version simply because I already had this one installed on my machine, could have used nvm)
- Database: in memory, would never use this for a real-case scenario but given the time constraint it will do. Would have used mysql on a real-case scenario
- I used Node's default 'http' package for handling requests, I could have used Express but not sure if that would qualify. I belive its not a fullstack framework but chose to be rather safe than sorry
- RabbitMQ for queue processing, prefered this one instead of Redis because it can more easily acknowledgment recipet and handle graceful shutdown, so no info is lost in case of server shutdown or error.


Endpoints:
[get] http://localhost:3001/players
[post] http://localhost:3001/players
Body:
```
{
    "name": "Lalala"
} 
```

[post] http://localhost:3001/battle/attack
body:
```
    {   "attackerId": 3,
    "defenderId": 4
    }
```

[get] http://localhost:3001/leaderboard


# What would be different

- I would have backend and frontend as separated projects and repos

# Things that are missing:
- Make player unable to be attacked when they have 0 gold or are already dead
- Validation on endpoints



## front end:
- Done with React
- Very rushed, has lots of boiler plate code and needs a lot of love and improvement like separating the interfaces from the components, separating the requested endpoints so its easier to track and turn everything into components

- I was hvving troubles making the players attack each other and I ran out of time, I suggest using the endpoint for attacking