### Battleships

## Run with
```
docker-compose up --build
```

## Layered Architecture
The folders were separated following this logic:
- Controllers (Routes/Handlers) - HTTP requests
- Services (Business Logic) -  application logic
- Repositories (Data Access) - for database
- Models (Data Structures) - data schemas 
- Utils (Helpers) -  utility functions

## Backend
- Node v18.19.0 (not the latest version simply because I already had this one installed on my machine, could have used nvm)
- Database: in memory, would never use this for a real-case scenario but given the time constraint it will do. Would have used mysql on a real-case scenario and an ORM as well to handle the types and db interactions. I personally am very found of PrismaORM because its clean and also offers migrations , which allows us to keep track of database changes and automatically apply it on other envs
- I used Node's default 'http' package for handling requests, I could have used Express but not sure if that would qualify the test criteria. I belive its not a fullstack framework but chose to be rather safe than sorry
- RabbitMQ for queue processing, prefered this one instead of Redis because it can more easily acknowledgment recipet and handle graceful shutdown, so no info is lost in case of server shutdown or error. Integrity! 

Endpoints:
- [get] get all players
http://localhost:3001/players

- [post] create new player
http://localhost:3001/players
Body:
```
{
    "name": "Lalala"
} 
```

- [post] make users attack
http://localhost:3001/battle/attack
body:
```
    {   "attackerId": 3,
        "defenderId": 4
    }
```

- [get]return leaderboard
http://localhost:3001/leaderboard


## front end:
- Done with React
- Very rushed, has lots of boiler plate code and needs a lot of love and improvement like separating the interfaces from the components, separating the requested endpoints so its easier to track and turn everything into components
- The components dont need to be all on the same single page
- I was having troubles making the players attack each other and I ran out of time, I suggest using the endpoint for attacking


# Things that are missing:
- Make player unable to be attacked (or attack!) when they have 0 gold or are already dead
- Validation on endpoints
- Handling concurrent attacks, like having different fights going on if they don't depend of each other
- the user interface could obviously be way more prettier :(
- tests, tests, tests, tests....
  


###Finishing Thoughts 
# What would be different
- I would have backend and frontend as separated projects and repos, its better for maintenance! (also microservices) Should probably separate the queue from the backend as well so they can all scalate separatedely and be maintained separatedely
- The queue logic should be way more robust and scalable, specially on keeping track of concurrent battles, it's the key to proper scalating this in order to be able to handle hundreads of requests at the same time
- For a quick testing I thought about creating workers/scripts to automatically battle each other at random, just to see the queue getting busy
- If we are expecting an insane amount of battles we could use Kafka as a queue since its wayyy more robust but it requires a lot more infrastructure for handling and managing so I didn't use it
- The leaderboard could be cached, no need to update it every single time, just let the player know its not instant update otherwise they may get frustrated. Maybe cache this with redis?? Would be a good option, its very lightweight. But! If we want the leaderboard to update every single time someone wins or loses gold I would have usde websockets for real-time update of infos instead of asking the backend each time something changes.


