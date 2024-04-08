# Project Proposal Example

## Project Description 

I would like to build an API for an art sharing website. The website allows artists to sign up and upload images to the site

In terms of technical requirements, it will use a MongoDB database in the backend to keep track of user accounts, image metadata, tags, etc. For now, images will be stored in the database by using GridFS, but looking into that, it appears database software isn't really best-suited for serving large static files like images. So, if I were to deploy this in a production app, I'd probably use an S3 for file storage and store file identifiers in the database to speed up transactions. In production, it might also be smart to use a cache to speed up frequent file queries.

## Wire Frames

**Initial Landing View**

**Results View**

## User Stories

#### MVP Goals

- AAU, I would like to register and log in with an authenticated account.
- AAU, I would like to upload drawings I've created to the website.
- AAU, I would like to assign images to tags so I can categorize each image.
- AAU, I would like to filter images by tags.
- AAU, I would like to mark images from other accounts as favorites.
- AAU, I would like to delete images after uploading them.

#### Stretch Goals

- AAU, I would like to personalize my profile and add a description.
- AAU, I would like to authenticate by email instead of just username and password.
- Maybe moving everything to a S3 instance instead of using GridFS?

#### Notionboard Template


#### Timeline - Daily Accountability

Do not neglect to plan, you will thank yourself later for being proactive!
| Day        |   | Task                               | Blockers | Notes/ Thoughts |
|------------|---|------------------------------------|----------|-----------------|
| Thursday   |   | Create and present proposal        |          |                 |
| Friday     |   | Create html, js, css files         |          |                 |
| Saturday   |   | Create basic scaffolding           |          |                 |
| Sunday     |   | Add functionality                  |          |                 |
| Monday     |   | Add styling                        |          |                 |
| Tuesday    |   | Finaliza MVP                       |          |                 |
| Wedenesday |   | Work on stretch goals              |          |                 |
| Thursday   |   | Work on icebox items if applicable |          |                 |
| Friday     |   | Presentation Day!                  |          |                 |
|            |   |                                    |          |                 |

