# Project Proposal Example

## Project Description 

I would like to build an API for an art sharing website. The website allows artists to sign up and upload images to the site, and also allows users to assign tags to their uploaded images to facilitate easy tag-based search.

In terms of technical requirements, it will use a MongoDB database in the backend to keep track of user accounts, image metadata, tags, etc. For now, images will be stored in the database by using GridFS, but looking into that, it appears database software isn't really best-suited for serving large static files like images. So, if I were to deploy this in a production app, I'd probably use an S3 for file storage and store file identifiers in the database to speed up transactions. In production, it might also be smart to use a cache to speed up frequent file queries.

## Wire Frames

![image](https://github.com/Fekinox/bored/assets/20966518/d62c4d13-022e-419f-9052-db6e6f7022bd)

![image](https://github.com/Fekinox/bored/assets/20966518/39c5a396-2eb6-497e-b5ca-ab677f16dcde)

## User Stories

#### MVP Goals

- AAU, I would like to register and log in with an authenticated account.
- AAU, I would like to upload drawings I've created to the website.
- AAU, I would like to assign images to tags so I can categorize each image.
- AAU, I would like to filter images by tags.
- AAU, I would like to mark images from other accounts as favorites.
- AAU, I would like to delete images after uploading them.
- AAU, I would like to modify image tags after they have been uploaded.
- AAU, I would like to 

#### Stretch Goals

- AAU, I would like to personalize my profile and add a description.
- AAU, I would like to authenticate by email instead of just username and password.
- Maybe moving everything to a S3 instance instead of using GridFS?

#### Notionboard Template


#### Timeline

| Day      | Task                                                                                                                                                 |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| 04/08 Mo | Finish up proposal, set up basic routing and controllers for CRUD                                                                                    |
| 04/09 Tu | Implement basic file uploading, post uploading, and tag-based search                                                                                 |
| 04/10 We | Implement user authentication and user-based search                                                                                                  |
| 04/11 Th | Implement really basic frontend to make it a bit more readable- landing page, post view, userpage view (don't want to get too attached to it though) |
| 04/12 Fr | Stretch goals                                                                                                                                        |
| 04/13 Sa | Stretch goals                                                                                                                                        |
| 04/14 Su | Stretch goals                                                                                                                                        |
| 04/15 Mo | Presentation                                                                                                                                         |

