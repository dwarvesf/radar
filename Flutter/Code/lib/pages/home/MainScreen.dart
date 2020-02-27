import 'package:flutter/material.dart';
import 'package:news_app_flutter_demo/models/Channel.dart';
import 'package:news_app_flutter_demo/models/News.dart';
import 'package:news_app_flutter_demo/pages/home/MainBloc.dart';
import 'package:news_app_flutter_demo/widgets/Drawer.dart';
import 'package:news_app_flutter_demo/widgets/Item.dart';

const List<String> categoryTitle = <String>[
  "Trang chủ",
  "Thế giới",
  "Kinh doanh",
  "Xe",
  "Văn hóa",
  "Thể thao",
  "Khoa học",
  "Giả thật",
  "Bạn đọc làm báo",
  "Thời sự",
  "Pháp luật",
  "Công nghệ",
  "Nhịp sống trẻ",
  "Giải trí",
  "Giáo dục",
  "Sức khoẻ",
  "Thư giãn",
  "Du lịch"
];
const List<String> categoryKey = <String>[
  "tin-moi-nhat.rss",
  "the-gioi.rss",
  "kinh-doanh.rss",
  "xe.rss",
  "van-hoa.rss",
  "the-thao.rss",
  "khoa-hoc.rss",
  "gia-that.rss",
  "ban-doc-lam-bao.rss",
  "thoi-su.rss",
  "phap-luat.rss",
  "nhip-song-so.rss",
  "nhip-song-tre.rss",
  "giai-tri.rss",
  "giao-duc.rss",
  "suc-khoe.rss",
  "thu-gian.rss",
  "du-lich.rss"
];

class MainScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MainScreenState();
  }
}

class _MainScreenState extends State<MainScreen> with TickerProviderStateMixin {
  TabController controller;
  List<MainBloc> mainBlocs;
  List<Tab> _tabs = List<Tab>();

  @override
  void initState() {
    super.initState();
    _tabs = getTabList();
    mainBlocs = List();
    controller = getTabController();
  }

  List<Tab> getTabList() {
    List<Tab> result = List<Tab>();
    for(var i = 0; i<categoryTitle.length; i++) {
      Tab tab = Tab(text: categoryTitle[i],);
      result.add(tab);
    }
    return result;
  }

  TabController getTabController() {
    return TabController(length: _tabs.length, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(
        child: MainScreenDrawer(controller: controller,),
      ),
      appBar: AppBar(
        title: Text("News"),
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(30.0),
          child: TabBar(
            isScrollable: true,
            indicatorColor: Colors.redAccent,
            unselectedLabelColor: Colors.white,
            labelColor: Colors.redAccent,
            controller: controller,
            tabs: _tabs,
          ),
        ),
      ),
      body: TabBarView(
        controller: controller,
        children: getChannelList(),
      ),
    );
  }

  List<Widget> getChannelList() {
    List<Widget> result = List<Widget>();
    for(var i = 0; i<categoryKey.length; i++) {
      result.add(_buildChannel(categoryKey[i]));
    }
    return result;
  }
  
  Widget _buildChannel(String channelString) {
    MainBloc mainBloc = new MainBloc();
    mainBloc.getChannel(channelString);
    mainBlocs.add(mainBloc);
    return StreamBuilder<Channel>(
      stream: mainBloc.subject.stream,
      builder: (BuildContext context, AsyncSnapshot<Channel> snapshot) {
        if (snapshot.hasData) {
          if (snapshot.data.errorMessage != null &&
              snapshot.data.errorMessage.length > 0) {
            return _buildError(snapshot.data.errorMessage,
                "Error cause by my business logic code!!! (ノಠ益ಠ)ノ彡┻━┻");
          } else {
            return _buildNewsTree(snapshot.data.news);
          }
        } else if (snapshot.hasError) {
          return _buildError(snapshot.error, "Some error caused after rxdart run (˵ ͡° ͜ʖ ͡°˵)");
        } else {
          return _buildLoading();
        }
      },
    );
  }

  Widget _buildError(String error, String type) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[Text(type), Text(error)],
      ),
    );
  }

  Widget _buildNewsTree(List<News> listNews) {
    var _news = <NewsItem>[];
    for (var i = 0; i < listNews.length; i++) {
      _news.add(NewsItem(news: listNews[i]));
    }
    return ListView.builder(
      itemBuilder: (BuildContext context, int index) => _news[index],
      itemCount: _news.length,
    );
  }

  Widget _buildLoading() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[Text("Loading"), Text("~~(͠≖ ͜ʖ͠≖)~~")],
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    if (mainBlocs.isNotEmpty) {
      mainBlocs.forEach((homeBloc) {
        homeBloc.dispose();
      });
    }
  }
}