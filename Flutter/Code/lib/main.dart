import 'package:flutter/material.dart';
import 'package:news_app_flutter_demo/pages/home/MainScreen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'News App Demo',
      home: MainScreen(),
    );
  }
}

