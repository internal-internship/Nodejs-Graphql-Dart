import 'package:client/services/graphql/mutations/post.dart';
import 'package:client/services/graphql/query/post.dart';
import 'package:client/services/post.dart';

void main() async {
  const query1 = getUsers;
  print(query1);
  print(createPost('titles', 'descripstion', '62c537dc7942c64ccf184394'));
  // Make a request to the server
  GraphqlRequest post = GraphqlRequest();
  await post.runQuery(
      createPost('titles', 'descripstion', '62c537dc7942c64ccf184394'));
  // GraphqlRequest post = GraphqlRequest();
  // await post.runQuery(query1);
}
