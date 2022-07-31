const getUsers = """query{
  getUsers {
    name
    email
    socialMedia {
      media {
        name
        url
      }
    }
    posts {
      title
      description
    }
  }
}""";
