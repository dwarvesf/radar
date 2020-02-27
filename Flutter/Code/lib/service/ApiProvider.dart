import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:news_app_flutter_demo/models/Channel.dart';
import 'package:xml2json/xml2json.dart';

class ApiProvider {
  final String baseUrl = "https://tuoitre.vn/rss/";
  final Dio _dio = new Dio();
  final Xml2Json xml2json = new Xml2Json();

  Future<Channel> getChannel(String channel) async {
    try {
      Response response = await _dio.get(baseUrl + channel);
      xml2json.parse(response.data);
      var jsonData = xml2json.toParker();
      var jsonDecode = json.decode(jsonData);
      return Channel.fromJson(jsonDecode['rss']['channel']);
    } catch(error) {
      print("Exception occured: ${error.toString()}");
      return Channel.withError(error.toString());
    }
  }
}