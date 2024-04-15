* The bored database consists of a collection of Posts.
* Posts may have one or multiple Tags, which are used in search queries to get related posts. Tags are all in lower_snake_case.
  * Tags may have namespaces, which can be used to denote artists (`artist:`) franchises (`franchise:`), characters (`character:`), and so on. Tags will be colored and sorted based on their namespace.
* Posts may be put in collections, which are separated from regular tags.
* Tags may be given wiki pages to further describe the tag and where it should be used.
* Users may add posts to their favorites.

# User authentication

* `POST /api/auth/signup` - Creates a new account.
    * ```json
      {
          "userName": "[0-9a-z_-]"
          "displayName": "any string"
          "password": "at least 12 characters"
      }
      ```

* `POST /api/auth/login` - Log in to the server.

* `POST /api/auth/logout` - Log out from the server.

* `POST /api/auth/login-status` - If you are logged in, get the account you are logged in as, otherwise return "Not logged in"

# Image search and modification

* `GET /api/posts` - Returns all posts in the database, sorted by upload time.
    * `?tags={taglist}` - Returns all images that satisfy each of the space-separated list of tags. Querying `blonde_hair+blue_eyes` will return all images with the tags `blonde_hair` and `blue_eyes`. You can negate a tag to instead get all images that do not match that tag. So querying `blonde_hair+-blue_eyes` will return all images tagged `blonde_hair` that are not tagged with `blue_eyes`.

* `POST /api/posts` - Upload an image to the database. User must be logged in.
    * Body (formdata)
        * `image`: The raw image/video data
        * `title`: Title of the image
        * `description`: Additional description for the image
        * `tags`: Comma-separated list of tags to apply to the image

* `GET /api/posts/{id}` - Get the given post by ID.

# Image modification

* `PUT /api/posts/{id}/tags` - Assign image to new set of tags, given in attached JSON. If tags do not already exist, tags will automatically be created for each new entry. If the item already has the tag, then this operation does nothing. User must be logged in and must own the image.
    * ```json
      {
          tags: [ "tag1", "tag2", ... ]
      }
      ```

* `DELETE /api/posts/{id}/tags` - Remove tags from the given image. If the image doesn't already have the tag, then this operation will do nothing. User must be logged in and must own the image.
    * ```json
      {
          tags: [ "tag1", "tag2", ... ]
      }
      ```

* `PUT /api/posts/{id}/metadata` - Change the post's metadata by providing a JSON object of the fields you'd like to modify. User must be logged in and must own the image.
  * ```json
    {
        title: (optional) string
        description: (optional) string
    }

# User information

* `GET /api/users/{userID}` - Get the information about the given user.

# Favorites

* `GET /api/users/{userID}/favorites` - Get the user's favorite posts.

* `POST /api/users/{userID}/favorites` - Add the attached post ID to the given user's favorites.

* `DELETE /api/users/{userID}/favorites/{postID}` - Remove the attached post ID from the given user's favorites.

* `PUT /api/users/{userID}/description` - Update the user's description.
