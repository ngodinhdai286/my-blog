# Database

## Post

- id:
- title:
- image
- slug
- createdAt
- status: 1(approved) 2(pending) 3(rejected)
- hot (true or false)
- contents
- userId
- categoryId

## Category

- id
- title
- slug
- status: 1(approved) 2(pending)
- createdAt

## User

- id
- displayName
- email
- password
- avatar
- status: 1(active) 2(pending) 3(banned)
- role: 1(admin) 2(mod) 3(user)
- permissions: "ADD_POST"
- createdAt
