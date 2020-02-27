import 'package:news_app_flutter_demo/models/Channel.dart';
import 'package:news_app_flutter_demo/service/ApiRepository.dart';
import 'package:rxdart/rxdart.dart';

class MainBloc {
  final ApiRepository _repository = ApiRepository();
  final BehaviorSubject<Channel> _subject = BehaviorSubject<Channel>();
  BehaviorSubject<Channel> get subject => _subject;

  getChannel(String stringChannel) async {
    Channel channel = await _repository.getChannel(stringChannel);
    _subject.sink.add(channel);
  }

//  flipIsLove(String title) {
//    _subject.value.news.forEach((item){
//      if (item.title == title) {
//        item.isLove = getFlipValue(item.isLove);
//      }
//    });
//  }
//
//  bool getFlipValue(bool isLove) {
//    if (isLove)
//      return false;
//    else
//      return true;
//  }

  dispose() {
    _subject.close();
  }
}