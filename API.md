* The bored database consists of a collection of Posts.
* Posts may have one or multiple Tags, which are used in search queries to get related posts. Tags are all in lower_snake_case.
  * Tags may have namespaces, which can be used to denote artists (`artist:`) franchises (`franchise:`), characters (`character:`), and so on. Tags will be colored and sorted based on their namespace.
* Posts may be put in collections, which are separated from regular tags.
* Tags may be given wiki pages to further describe the tag and where it should be used.
* Users may add posts to their favorites.

# User authentication

* `POST /api/signup` - Creates a new account.
    * ```json
      {
          "userName": "[0-9a-z_-]"
          "displayName": "any string"
          "password": "at least 12 characters"
      }
      ```

* `POST /api/login` - Log in to the server.

# Image search

* `GET /api/posts` - Returns all posts in the database, sorted by upload time.
    * `?tags={taglist}` Return only posts that are in one of the given tag groups, separated by commas. The syntax for tag queries is as follows:
        * Every query is a disjunction of conjunctions, with each conjunction separated by `|`.
        * Every conjunction is a sequence of atoms separated by either `-` or `+`, with an optional leading `-` representing the first tag is negated.
        * An atom is either a single tagname or another valid query, wrapped in parentheses.

* `POST /api/posts` - Upload an image to the database.
    * Body (formdata)
        * `image`: The raw image/video data
        * `type`: Filetype of the image
        * `title`: Title of the image
        * `description`: Additional description for the image
        * `tags`: Comma-separated list of tags to apply to the image

* `GET /api/posts/:id` - Get the given post by ID.

# Image modification

* `PUT /api/posts/{id}/tags` - Assign image to new set of tags, given in attached JSON. If tags do not already exist, tags will automatically be created for each new entry. If the item already has the tag, then this operation does nothing.
    * ```json
      {
          tags: [ "tag1", "tag2", ... ]
      }
      ```

* `DELETE /api/posts/{id}/tags` - Remove tags from the given image. If the image doesn't already have the tag, then this operation will do nothing.
    * ```json
      {
      }
      ```

* `PUT /api/posts/{id}/description` - Change the post's description.

* `PUT /api/posts/{id}/title` - Change the post's title.

# User information

* `GET /api/users/{userID}` - Get the information about the given user.

# Favorites

* `GET /api/users/{userID}/favorites` - Get the user's favorite posts.

* `POST /api/users/{userID}/favorites` - Add the attached post ID to the given user's favorites.

* `DELETE /api/users/{userID}/favorites/{postID}` - Remove the attached post ID from the given user's favorites.
