# bored - the boring art website

A NodeJS-based backend for an art website powered by MongoDB.

## Features

* **Tag search** - search the image database by tags. Tags are words written in snake\_case with an optional namespace attached to them prepended with a :. So, some sample tags are `blonde_hair`, `black_hair`, or `artist:foobar`. The search engine also has support for negative tags- searching `-blonde_hair` returns all entries not tagged with `blonde_hair`.
* **User accounts** - Sign up for an account to either upload images of your own or add images that you like to your favorites, which you can search through. You can also browse through other users' favorites.

## Getting Started

* Create a `.env` file containing the following pieces of information:
    * `DATABASE_URI` - A `mongodb://` url pointing to a MongoDB database instance you would like to use to store post informaiton.
    * `AUTH_SECRET` - Secret for use in encrypting JWT tokens to add to the client.
    * `PORT` - Port you would like to listen in on.
    * `IMGUR_CLIENT_ID`, `IMGUR_CLIENT_SECRET`, `IMGUR_ACCOUNT_TOKEN`, `IMGUR_REFRESH_TOKEN` - Obtained by registering an Imgur client ID and using it to authenticate an Imgur account to use for hosting the images. Refer to [the Imgur API docs](https://apidocs.imgur.com/#authorization-and-oauth) for more information.
* Start the server with `npm start`.

## Attributions and Technologies Used

| Express | Node-based web server, handles HTTP routing                                            |
|---------|----------------------------------------------------------------------------------------|
| MongoDB | NoSQL database service used to store image metadata, user information, favorites, etc. |
| Imgur   | Image hosting service used to store files to be referred to in the database            |
| Axios   | Used to communicate with the Imgur api                                                 |

## Next Steps

* Building a proper file server to handle image storage, processing, and delivery instead of using a third party like Imgur to handle it. Would be a lot more convenient, I'd imagine
* Making a nicer frontend- I kept the frontend for this extremely minimal, as that really wasn't the focus of this project. I'd love to carry all of this backend stuff to a project in which I can really splurge on the frontend!
* Tag Wiki - Provide an easy way to add additional information about a tag that users can access and modify.
* Tag Voting - Users can make requests for a certain post to have a certain set of tags added/removed.
* Advanced moderation/administration roles - Give certain users the right to add/remove tags on any post, and other moderation tools
