class News {
  final String title;
  final String imageUrl;
  final String description;
  final String pubDate;
  final String link;
  bool isLove;

  News(this.title, this.imageUrl, this.description, this.pubDate, this.link, this.isLove);

  News.fromJson(Map<String, dynamic> json)
      : title = json['title'],
        imageUrl = getImgUrl((json['description'])),
        description = getDescription(json['description']),
        pubDate = json['pubDate'],
        link = json['link'],
        isLove = false;

  static String getImgUrl(String stringJson) {
    if (stringJson.isEmpty &&
        !stringJson.contains('src=') &&
        getImgSuffix(stringJson) != null)
      return "";
    var imgSuffix = getImgSuffix(stringJson);
    int startIndex = stringJson.indexOf('src=') + 5;
    int endIndex = stringJson.indexOf(imgSuffix) + imgSuffix.length;
    return stringJson.substring(startIndex, endIndex);
  }

  static String getDescription(String stringJson) {
    if (stringJson.isEmpty && !stringJson.contains('TTO')) return "";
    var startIndex = stringJson.indexOf('TTO') + 6;
    return stringJson.substring(startIndex);
  }

  static String getImgSuffix(String stringJson) {
    if (stringJson.contains("jpg")) return "jpg";
    if (stringJson.contains("png")) return "png";
    if (stringJson.contains("jpeg")) return "jpeg";
    if (stringJson.contains("gif")) return "gif";
    return null;
  }
}
