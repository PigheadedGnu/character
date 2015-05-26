Character
---------

The goal of this project is to create a web application to replace pen and paper character sheets while playing Dungeons & Dragons 5th Edition.

This app isn't meant to replace playing in-person; on the contrary, table top games are meant to be played surrounded by your closest friends (your enemies...).

Dev Usage
---------

Clone the repo and cd into the directory. Then, you'll need to 

```
npm install
```

to download all of the dependencies. Once you have all of the dependencies, you can run a few [Gulp]() commands:

```
$ gulp                # cleans, builds vendor and the app, watches for changes, opens browser
$ gulp lint           # lint your javascipt!
$ gulp mocha          # run unit tests in the tests folder
$ gulp clean          # remove all build files
$ gulp watch          # build the app and watch for changes
$ gulp build-vendor   # build just vendor files
```

The most useful is probably going to be `gulp` by itself which will set everything up for you to develop.

Viewing the App
---------------

Once you have cloned a local copy of the code, you can run

```
$ gulp
```

Let it do it's thing, and eventually, it should open up a web browser with the address `localhost:8080`. URLs available are:

```
localhost:8080            # the character sheet page
localhost:8080/#/user/id  # user page that should show user's created characters
localhost:8080/#/login    # page to log in / log out a user
localhost:8080/#/style    # style guide showing basic components
```

Each route above uses a different view component located in `src/ui/views` folder. Each one is bare and needs work.

License
--------

MIT
