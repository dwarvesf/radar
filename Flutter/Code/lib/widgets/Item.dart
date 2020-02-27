import 'package:flutter/material.dart';
import 'package:news_app_flutter_demo/models/News.dart';

class NewsItem extends StatefulWidget {
  final News news;

  const NewsItem({Key key, @required this.news})
      : assert(news != null),
        super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _NewsItemState(news: news);
  }
}

class _NewsItemState extends State<NewsItem> {
  final News news;

  _NewsItemState({@required this.news}) : assert(news != null);

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Center(
        child: Container(
          child: Padding(
            padding: EdgeInsets.fromLTRB(4.0, 0.0, 4.0, 8.0),
            child: Padding(
              padding: EdgeInsets.fromLTRB(10.0, 8.0, 10.0, 8.0),
              child: Column(
                textDirection: TextDirection.ltr,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  Row(children: <Widget>[
                    Image.network(
                      news.imageUrl,
                      alignment: Alignment.centerLeft,
                      fit: BoxFit.fitHeight,
                    ),
                    Expanded(
                        child: Center(
                            child: InkWell(
                                radius: 4.0,
                                borderRadius:
                                    BorderRadius.all(Radius.circular(20.0)),
                                highlightColor: Colors.black12,
                                onTap: () {
                                  setState(() {
                                    news.isLove = !news.isLove;
                                  });
                                },
                                child: Icon(
                                  getStartIcon(news.isLove),
                                  color: Colors.redAccent,
                                  size: 40.0,
                                )))),
                  ]),
                  SizedBox(
                    height: 10.0,
                  ),
                  Text(
                    news.title,
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.indigoAccent,
                        fontSize: 18.0,
                        fontFamily: 'Raleway'),
                  ),
                  SizedBox(
                    height: 5.0,
                  ),
                  Text(
                    news.description,
                    style: TextStyle(
                        fontStyle: FontStyle.normal,
                        color: Colors.black54,
                        fontSize: 16.0,
                        fontFamily: 'Raleway'),
                  ),
                  SizedBox(
                    height: 10.0,
                  ),
                  Text(
                    news.pubDate,
                    style: TextStyle(
                        fontStyle: FontStyle.italic,
                        color: Colors.black26,
                        fontSize: 14.0,
                        fontFamily: 'Raleway'),
                  ),
                  Divider(
                    height: 1.0,
                    color: Colors.black26,
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  IconData getStartIcon(bool isLove) {
    if (isLove) {
      return Icons.star;
    } else {
      return Icons.star_border;
    }
  }
}
