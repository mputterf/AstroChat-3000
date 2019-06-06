# AstroChat 3000
##What is this?
AstroChat 3000 is a realtime chat where users can sign up and chat with each other. The chat is hosted on Heroku.

##Can I visit it?
You may do so here: https://calm-depths-14537.herokuapp.com/

##What the technology behind it?
The realtime chat is powered by `socket.io`, which sends data to the server and then to all the clients connected. It can be used for more than just chat messages. For example, it's also powering the realtime user list, so you can see who is online.

Messages are saved into a `MySQL` databse using `Sequelize` and are retrieved when a new user joins. If you show up late, you can view previously sent messages.
