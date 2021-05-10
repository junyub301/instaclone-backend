## 프로젝트 목적 (Instaclone)

인스타그램 클론 코딩 Backend.

## 설치
<details>
<summary>apollo-server , graphql 설치 </summary>
  
```Shell
# NPM
npm install apollo-server graphql

# yarn
yarn add apollo-server graphql
```
</details>
<details>
<summary>babel 설치 </summary>

```Shell
# NPM 
npm install --save-dev @babel/core
npm install @babel/preset-env @babel/node --save-dev


# yarn
yarn add --save-dev @babel/core
yarn add @babel/preset-env @babel/node --save-dev
```
</details>

<details>
<summary>Prisma 설치 </summary>

```Shell
# NPM
npm install prisma -D

# yarn
yarn add prisma -D
```
</details>

<details>
<summary>Prisma client 설치 </summary>

```Shell
# NPM 
npm install @prisma/client

# yarn
yarn add @prisma/client
```
</details>

<details>
<summary>graphql tools 설치 </summary>

```Shell
# NPM
npm i graphql-tools

# yarn
yarn add graphql-tools]
```
</details>

<details>
<summary>dotenv 설치</summary>

```Shell
# NPM 
npm i dotenv

# yarn
yarn add dotenv
```
</details>

## API 목록
<details>
  <summary>User</summary>

-   [X] Create Account
-   [X] See Profile
-   [X] Login
-   [X] Edit Profile
-   [X] CHange Avatar (Image Upload)
-   [x] Follow User
-   [x] Unfollow User
-   [x] See Followers with Paginataion
-   [x] See Follwing with Paginataion
-   [x] Computed Fields
-   [x] Search Users

</details>
<details>
<summary>Photos</summary>

-   [X] Upload Photo (Parse #)
-   [X] See Photo
-   [x] See Hashtags
-   [x] Search Photos
-   [x] Edit Photo
-   [x] Like / Unlike Photo
-   [x] See Photo Likes
-   [ ] See Photo Comments
-   [x] See Feed
-   [X] Is Mine (Delte Photo)

</details>
<details>
<summary>Comments</summary>

-   [X] Comment on Photo
-   [X] Edit Comment
-   [X] Delete Comment (Is Mine)
</details>
<details>
<summary>Refactor</summary>
  
-   [x] Mutation Responses
  
</details>
<details>
<summary>Extras</summary>
  
-   [ ] S3 Image Upload

</details>
