import 'package:http/http.dart' as http;
import 'dart:convert';

class GraphqlRequest {
  final Uri uri = Uri.parse("http://localhost:5000/graphql");
  Future<void> runQuery(query) async {
    final response = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'query': query,
      }),
    );
    print(response.body);
  }
}
