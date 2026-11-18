# Giấy phép dữ liệu thứ tự nét Kana

Animation thứ tự nét trong Kana Studio sử dụng dữ liệu từ dự án `fude-kana-data`, một tác phẩm phái sinh của KanjiVG.

## Attribution

- Tác phẩm gốc: KanjiVG.
- Tác giả KanjiVG: Ulrich Apel.
- Nguồn: https://kanjivg.tagaini.net/
- Dữ liệu trung gian: https://github.com/karimghezali/fude-kana-data
- Giấy phép: Creative Commons Attribution ShareAlike 3.0 Unported.
- Nội dung giấy phép: https://creativecommons.org/licenses/by-sa/3.0/legalcode

## Các thay đổi được đóng gói trong Kana Studio

- Chỉ giữ dữ liệu Kana đã được `fude-kana-data` trích xuất từ KanjiVG.
- Gộp 176 file JSON thành một asset JavaScript để hoạt động khi mở trực tiếp bằng `file://`.
- Giữ nguyên thứ tự stroke và các điểm đã được chuẩn hóa.
- Dùng các điểm để vẽ animation tuần tự trước bài kiểm tra viết.
- Với âm ghép gồm nhiều Kana, Kana Studio bố trí từng ký tự trong cùng canvas và chạy stroke theo thứ tự từ trái sang phải.
- Ký hiệu âm dài Katakana `ー`, không có trong snapshot nguồn, dùng một nét ngang trái sang phải được định nghĩa trực tiếp trong mã ứng dụng.

Dữ liệu thứ tự nét được phân phối lại theo CC BY-SA 3.0. Bản đầy đủ của `LICENSE` và `NOTICE` đi kèm trong `assets/stroke-data`.
