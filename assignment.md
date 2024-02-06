# Tree structure viewer

The aim of this application is to visualise universal tree structure, that could be edited / enhanced by User.

## Application structure

Application has two standalone programming parts and one DevOps part

1. ### Data structure edit form

   This compoment should behave as popup form, allowing user to:

   1. edit already existing item
   2. delete existing item (and all of its descendants)
   3. add a new item anywhere to an existing structure

   All changes that happen to structure should be immediately visualised after user confirms/submits the form. It's up to author whether all 3 mentioned actions are part of one big form, or each behaves as an standalone form.

   > Bonus points for availability to change an order of elements.

   > Bonus points for allowing user to move all children items to other parent when deleting nodes

2. ### Tree viewer

   This compoment is meant to display the current data structure to user. 

   It can be native HTML list, native HTML table, HTML canvas, Material UI List, Material UI TreeView, D3 tree structure, etc.

   Author can choose what type of visualisation methodology suits his needs best.

   > Bonus points for interactivity

   > Bonus points for graphics

   > Bonus points for virtualization

3. ### Application deployment

   As the main goal of any application is to be used by user, we need to deploy our application, so others can access it.

   Find any publicly avaialable git hosting and publish your application there.

   > Bonus points for live deployment to web as fully running application

## Technology

It is required to use the following technology:

- git ()
- React.JS
  - React context
  - React hooks

It is forbidden to use:

- 3rd party libraries for handling tree structure data (except for already mentioned examples used to handle visualisation)

Bonus points for used technologies and features:

- TypeScript
- Material UI (or any other UI library) to visualise form part
- Jest (or any other testing libraty)

## Data structure

Starting data structure is in attached `data.json` file and mimicks data coming from flat database/table. It has the following format:

```json
[
    { "id": 1, "name": "Item no. 1", "parentId": 4 },
    { "id": 6, "name": "Item no. 6", "parentId": 2 },
    { "id": 4, "name": "Item no. 4", "parentId": 0 },
    { "id": 2, "name": "Item no. 2", "parentId": 1 },
    { "id": 3, "name": "Item no. 3", "parentId": 2 },
    { "id": 5, "name": "Item no. 5", "parentId": 0 },
    ...
]
```

where:

- `id` - unique identifier among data structure (take special care when creating a new items)
- `name` - just label of the item used to display purposes and can be edited / created by user 
- `parentId` - id reference to parent item
  - positive number value always references to existing item
  - 0 references to root level

Author can assume that all of these properties are always set and their type never changes.

Above example data structure results into following tree structure, like:

1. Item no. 4
   1. Item no. 1
      1. Item no. 2
         1. Item no. 6
         1. Item no. 3
1. Item no. 5

> Note: All "Bonus points" sidenotes are not required and are considered only as nice to have features.
> Work on them only if you were able to finish all required parts without any compromise.

Don't forget to add brief documentation how to run your application.
