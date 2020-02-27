import 'package:news_app_flutter_demo/models/Channel.dart';
import 'package:news_app_flutter_demo/service/ApiProvider.dart';

class ApiRepository {
  ApiProvider apiProvider = ApiProvider();
  Future<Channel> getChannel(String channel) {
    return apiProvider.getChannel(channel);
  }
}