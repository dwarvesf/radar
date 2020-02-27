import 'package:flutter/material.dart';
import 'package:news_app_flutter_demo/pages/home/MainScreen.dart';

class MainScreenDrawer extends StatelessWidget {
  final TabController controller;

  MainScreenDrawer({this.controller});

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(children: <Widget>[
      Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(colors: [Colors.lightBlue, Colors.blue]),
          ),
          child: Column(children: <Widget>[
        SizedBox(
          height: 30.0,
        ),
        Text(
          "News category",
          style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.deepOrange,
              fontSize: 18.0,
              fontFamily: 'Raleway'),
        ),
        Divider(
          thickness: 2.0,
          color: Colors.deepOrangeAccent,
        ),
      ])),
      Expanded(
          child: Container(
              child: Padding(
                  padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                  child: ListView(
                    padding: EdgeInsets.zero,
                    children: getListCategory(context),
                  ))))
    ]));
  }

  List<Widget> getListCategory(BuildContext context) {
    List<Widget> result = List<Widget>();
    for (var i = 0; i < categoryTitle.length; i++) {
      result.add(buildCategoryItem(context, categoryTitle[i], i));
    }
    return result;
  }

  Widget buildCategoryItem(
      BuildContext context, String categoryTitle, int index) {
    return InkWell(
        highlightColor: Colors.black12,
        onTap: () {
          Navigator.pop(context);
          final snackBar = SnackBar(
            content: Text(categoryTitle),
          );
          Scaffold.of(context).showSnackBar(snackBar);
          controller.animateTo(index);
          print("Tap tap tap... mlem mlem (.-.)");
        },
        child: Container(
            color: getGradientColor(index),
            child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
              Row(children: <Widget>[
                Expanded(
                    child: Padding(
                        padding: EdgeInsets.fromLTRB(15, 15, 0, 15),
                        child: Text(
                          categoryTitle,
                          textAlign: TextAlign.start,
                          style: TextStyle(
                              color: Colors.black,
                              fontWeight: FontWeight.bold,
                              fontSize: 16.0,
                              fontFamily: 'Raleway'),
                        ))),
                Padding(
                  padding: EdgeInsets.fromLTRB(0, 0, 10, 0),
                  child: Icon(
                    Icons.arrow_forward,
                    color: Colors.black,
                  ),
                )
              ]),
            ])));
  }

  Color getGradientColor(int index) {
    var colors = Colors.accents;
    if (index > colors.length - 1) {
      return colors[index - colors.length];
    }
    return colors[index];
  }
}
