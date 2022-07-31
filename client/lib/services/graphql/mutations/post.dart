// ignore: prefer_function_declarations_over_variables
final createPost = (title, description, creator) => """mutation{
    createPost(title: "$title",description: "$description",creator: "$creator"){
     _id,
    creator {
      name,
      email
    }
  }
  }""";
