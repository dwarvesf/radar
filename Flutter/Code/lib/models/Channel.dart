import 'News.dart';

class Channel {
  final String title;
  final String description;
  final String link;
  final List<News> news;
  final String errorMessage;

  Channel(
      this.title, this.description, this.link, this.news, this.errorMessage);

  factory Channel.fromJson(Map<String, dynamic> json) {
    var list = json['item'] as List;
    print(list.toString());
    List<News> listNews = list.map((i) => News.fromJson(i)).toList();
    return Channel(json['title'], json['description'], json['link'], listNews, "");
  }

  Channel.withError(String errorMessage)
      : title = "",
        description = "",
        link = "",
        news = List<News>(),
        errorMessage = errorMessage;
}
