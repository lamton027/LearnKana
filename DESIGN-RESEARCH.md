# Khảo sát và định hướng thiết kế

Khảo sát ngày 18/11/2026. Mục tiêu không phải sao chép thương hiệu, mà tổng hợp các mẫu UX phổ biến và phù hợp nhất cho app chuyên học Kana trên điện thoại.

## Nhóm app tham chiếu

| App / nguồn | Mẫu UX quan sát được | Ứng dụng vào Kana Studio |
| --- | --- | --- |
| Duolingo Japanese | Lộ trình tuần tự, bài ngắn, tab riêng cho Hiragana/Katakana, ghép âm với chữ và viết trực tiếp trên màn hình | Màn Hôm nay, lộ trình theo hàng âm, lesson focus và canvas luyện viết |
| LingoDeer | Học từ bảng chữ đến hội thoại, character drill và nội dung theo bài có cấu trúc | Bảng chữ phân nhóm + chi tiết một chữ + bài luyện ngắn |
| Renshuu | Learning path linh hoạt, nhiều dạng câu hỏi, chọn multiple choice/typing/writing | Quiz một câu một màn hình, khu vực ôn chữ yếu, mở rộng được nhiều kiểu input |
| Busuu | Khóa Hiragana/Katakana riêng, bài bite-size, mnemonic bằng hình/word association, progress path | Mẹo ghi nhớ, ví dụ từ vựng và theo dõi tiến độ riêng từng bảng |
| Bunpo | Curriculum theo ngày, feedback tức thì, progress tracker | Nhịp học hàng ngày, phản hồi đúng/sai, thống kê tuần |
| Kana Mind / Kana Pro | Chuyên đọc/viết Kana, bật tắt nhóm chữ, thuật toán ôn và theo dõi chữ yếu | Bộ lọc nhóm chữ, review đến hạn, cặp dễ nhầm và lưu tiến độ cục bộ |

## Nguồn

- Duolingo — Japanese writing systems: https://blog.duolingo.com/japanese-writing-systems/
- Duolingo — writing skills: https://blog.duolingo.com/covering-all-the-bases-duolingos-approach-to-writing-skills/
- LingoDeer App Store: https://apps.apple.com/us/app/lingodeer-learn-languages/id1261193709
- Renshuu Google Play: https://play.google.com/store/apps/details?id=com.renshuu.renshuu_org
- Busuu Japanese: https://www.busuu.com/en/app/learn-japanese-app
- Busuu Katakana: https://www.busuu.com/en/japanese/katakana
- Bunpo: https://bunpo.app/
- Kana Mind App Store: https://apps.apple.com/us/app/kana-mind-katakana-hiragana/id949211040
- Kana Pro App Store: https://apps.apple.com/us/app/kana-pro-hiragana-katakana/id6759677386
- KanjiVG: https://kanjivg.tagaini.net/
- fude-kana-data: https://github.com/karimghezali/fude-kana-data

## Design contract

- Product surface: web app mobile-first có thể cài như app ở giai đoạn sau.
- User job: học hết Kana mà không bị ngợp; mỗi phiên 4–8 phút; thấy ngay chữ nào đang học và cần ôn.
- Primary action: “Học tiếp” ở màn đầu; mỗi màn bài học chỉ có một quyết định chính.
- Hierarchy: việc cần làm hôm nay → giới thiệu nhóm chữ → nhìn/phát âm → animation thứ tự nét → luyện viết từng chữ → 4 vòng trắc nghiệm + viết không mẫu → mở khóa bài tiếp theo → tiến độ.
- Target viewports: 390×844 (điện thoại chính), 360×800 (điện thoại hẹp), 1440×900 (trình bày prototype trên desktop).
- Tone: bình tĩnh, có chất liệu giấy Nhật, không trẻ con; màu triện đỏ cho hành động và xanh mực cho tiến độ.
- Memorable detail: dấu triện `か` và các thẻ kana như mảnh giấy luyện thư pháp.
- Accessibility: touch target khoảng 44px, trạng thái focus rõ, semantic buttons, nhãn âm thanh/canvas, hỗ trợ reduced motion.
- Performance: HTML/CSS/JS thuần, không framework và không ảnh nặng.

## Trạng thái nội dung

- Loading: không áp dụng trong prototype local; không có dữ liệu mạng.
- Empty: bảng chữ luôn có dữ liệu đóng gói; quiz có pool cục bộ.
- Error: Web Speech API có fallback thông báo khi trình duyệt không hỗ trợ.
- Partial: khi chưa có mnemonic/từ ví dụ riêng, UI dùng nội dung fallback rõ ràng.
- Success: quiz và luyện viết trả phản hồi, cập nhật tiến độ local.
- Success transition: sau chữ cuối, app tạo 8 bước xen kẽ ngẫu nhiên; trắc nghiệm chuyển sang canvas trắng, bài viết chỉ hiện đáp án sau khi bộ nhận diện hình dáng xác nhận đúng Kana; bước thứ 8 mới hoàn thành và mở nhóm kế tiếp.
- Permission: microphone chỉ được yêu cầu sau khi người dùng chạm “Chạm để nói”; UI giải thích mục đích, không lưu audio và có đường bỏ qua khi bị từ chối hoặc không hỗ trợ.

