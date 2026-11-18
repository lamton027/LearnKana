# Tài liệu bàn giao dự án Kana Studio

Tài liệu này tổng hợp trạng thái hiện tại của Kana Studio, toàn bộ hạng mục đã triển khai, cách dữ liệu người học được lưu, cách chạy và đóng gói dự án, các kiểm thử đã thực hiện và những giới hạn còn lại. Mục tiêu là giúp có thể chuyển dự án sang máy khác, đưa lên GitHub hoặc tiếp tục phát triển mà không phải đọc lại toàn bộ lịch sử trao đổi.

**Ngày tổng hợp:** 18 tháng 11 năm 2026  
**Trạng thái:** Prototype web mobile first hoạt động offline, không cần build step
**Offline build:** `2026.11.18.6 · Stroke order flow`

## 1. Mục tiêu sản phẩm

Kana Studio là ứng dụng học nhận mặt chữ, cách đọc và cách viết Hiragana và Katakana trên điện thoại. Trải nghiệm được tổ chức thành các phiên ngắn, đi từ nguyên âm đến từng hàng chữ, sau đó mới mở biến âm, âm ghép và ký hiệu nhỏ.

Các nguyên tắc chính đã được áp dụng:

- Mỗi màn học chỉ có một hành động chính.
- Học theo thứ tự từ dễ đến khó, bắt đầu bằng `あ・い・う・え・お`.
- Phát âm là bước duy nhất được phép bỏ qua.
- Chữ chỉ được công nhận là đã thuộc sau khi hoàn thành toàn bộ bài kiểm tra cuối nhóm.
- Ôn tập chỉ sử dụng các chữ đã được công nhận là đã thuộc.
- Giao diện, dữ liệu Kana và font đều được đóng gói để chạy offline.

## 2. Nghiên cứu và định hướng giao diện

Định hướng UX được tổng hợp từ các mẫu phổ biến của Duolingo Japanese, LingoDeer, Renshuu, Busuu, Bunpo, Kana Mind và Kana Pro. Dự án không sao chép nhận diện của các sản phẩm này mà chọn lọc các mẫu phù hợp:

- Lộ trình tuần tự và bài học ngắn.
- Bảng chữ có bộ lọc theo nhóm.
- Một chữ trên mỗi màn chi tiết.
- Kết hợp nhìn, nghe, phát âm và viết.
- Quiz một câu trên một màn hình.
- Ôn tập chữ yếu và các cặp dễ nhầm.
- Tiến độ trực quan theo nhóm bài học.

Phong cách hình ảnh sử dụng nền giấy sáng, màu triện đỏ cho hành động, xanh mực cho tiến độ và dấu `か` làm chi tiết nhận diện. Tài liệu nghiên cứu đầy đủ nằm trong `DESIGN-RESEARCH.md`.

## 3. Kiến trúc kỹ thuật

Dự án dùng HTML, CSS và JavaScript thuần:

- Không framework.
- Không bundler.
- Không cần cài dependency để chạy ứng dụng.
- Không tải font hoặc dữ liệu từ CDN.
- Không có backend hoặc tài khoản người dùng.
- Dữ liệu tiến độ được lưu trong `localStorage` của trình duyệt trên từng thiết bị.

Các thành phần chính:

| File hoặc thư mục | Vai trò |
| --- | --- |
| `index.html` | Cấu trúc tất cả màn hình và điều hướng |
| `styles.css` | Design system, responsive, font offline và trạng thái giao diện |
| `app.js` | State, routing, bài học, giọng nói, canvas, quiz, tiến độ và ôn tập |
| `kana-db.js` | Cơ sở dữ liệu Kana và curriculum |
| `assets/fonts` | Font tiếng Việt, tiếng Nhật và giấy phép OFL |
| `server.js` | Local server tại cổng 4173 |
| `START-KANA-STUDIO.bat` | Khởi chạy nhanh trên Windows |
| `tests/lesson-flow-smoke.mjs` | Smoke test headless cho toàn bộ luồng chính và responsive |
| `evidence` | Ảnh render và hồ sơ kiểm chứng giao diện |

## 4. Dữ liệu Hiragana và Katakana

`kana-db.js` hiện chứa:

- 114 mục Hiragana.
- 116 mục Katakana.
- 54 nhóm bài học.
- 46 chữ cơ bản cho mỗi bảng.
- 25 biến âm cho mỗi bảng.
- 33 âm ghép cho mỗi bảng.
- Hiragana nhỏ, Katakana nhỏ, âm dài `ー` và `ヴ`.

Lộ trình bắt đầu bằng:

1. Nguyên âm Hiragana `あ・い・う・え・お`.
2. Hàng K, S, T, N, H, M, Y, R, W và N.
3. Biến âm Hiragana.
4. Âm ghép và Kana nhỏ.
5. Katakana cơ bản.
6. Biến âm, âm ghép và ký hiệu Katakana.

Màn Bảng chữ cho phép chuyển giữa Hiragana và Katakana, sau đó lọc theo chữ cơ bản, biến âm, âm ghép hoặc ký hiệu nhỏ.

## 5. Luồng học đã triển khai

Luồng chuẩn của một nhóm bài:

1. Màn giới thiệu nhóm chữ.
2. Xem chi tiết từng chữ, romaji, mẹo nhớ và từ ví dụ.
3. Stage 1/5: nhìn chữ và học phát âm bằng microphone.
4. Stage 2/5: xem animation đúng thứ tự và hướng nét; màn tự chuyển tiếp.
5. Stage 3/5: trắc nghiệm mặt chữ, chỉ dùng lựa chọn thuộc nhóm Kana hiện tại.
6. Stage 4/5: luyện viết có chữ mẫu trên canvas và chấm từng nét.
7. Stage 5/5: nhìn romaji và tự viết trên canvas trắng; kiểm tra mặt chữ, số nét, thứ tự và hướng nét.
8. Sai ba lần liên tiếp ở một phần luyện tập sẽ quay về stage xem thứ tự nét.
9. Lặp đủ năm stage cho tất cả chữ trong nhóm.
8. Làm bài kiểm tra cuối nhóm gồm tám bước được chấm.
9. Hoàn thành bước cuối mới lưu toàn bộ chữ của nhóm là đã thuộc, mở nhóm tiếp theo và cập nhật chuỗi ngày học.

### Hiển thị romaji

Romaji được hiển thị với kích thước lớn hơn để người học dễ nhận biết cách phiên âm trên màn hình điện thoại, đặc biệt tại màn chi tiết và bài viết từ romaji.

### Luyện viết có hướng dẫn

Trước khi canvas có mẫu xuất hiện, app phát animation từ dữ liệu stroke-order thật. Animation dùng 176 bản ghi từ KanjiVG thông qua `fude-kana-data`, giữ nguyên thứ tự và danh sách điểm chuẩn hóa. Với âm ghép, app bố trí Kana chính cùng Kana nhỏ rồi phát stroke từ trái sang phải. Nếu thiết bị bật Reduce Motion, app hiện mẫu hoàn chỉnh trong thời gian ngắn rồi vẫn tự chuyển sang luyện viết.

Canvas luyện viết hỗ trợ:

- Vẽ bằng chuột hoặc cảm ứng.
- Chữ mẫu chìm.
- Đường căn giữa.
- Đếm số nét.
- Hoàn tác nét cuối.
- Xóa toàn bộ.
- Ẩn hoặc hiện chữ mẫu.

Sau luyện viết có mẫu, app luôn mở stage viết không mẫu của chính chữ đó. Kết quả được trả trực tiếp: nếu sai, trạng thái lỗi yêu cầu viết lại và giữ nguyên công cụ sửa; nếu đúng, app thông báo đã học được cách viết chữ rồi mở hành động học chữ tiếp theo hoặc chuyển sang bài kiểm tra cuối. Không còn nút “Hoàn thành chữ” để xác nhận kết quả lần hai.

## 6. Bài kiểm tra cuối nhóm

Sau khi học xong một cụm chữ, ứng dụng tạo bốn vòng. Mỗi vòng gồm hai bước được chấm:

1. Trắc nghiệm: nhìn Kana và chọn romaji đúng.
2. Viết không mẫu: nhìn romaji và viết Kana trên canvas trắng.

Tổng cộng có tám bước xen kẽ `choice → draw`. Animation đã được học trước đó theo từng chữ nên không lặp lại trong assessment.

Bộ sinh assessment bảo đảm bốn câu trắc nghiệm không trùng chữ với nhóm có ít nhất bốn chữ và mọi danh sách đáp án đều duy nhất. Mọi đáp án đúng và đáp án nhiễu chỉ lấy từ chính nhóm chữ đang kiểm tra để không lộ đáp án qua lựa chọn ngoài phạm vi. Nhóm ba chữ hiển thị ba lựa chọn thuộc nhóm, vẫn lặp đủ bốn vòng nhưng không đặt cùng một chữ ở hai câu liên tiếp. Bước viết trong cùng vòng không dùng cùng chữ với câu trắc nghiệm và cũng không lặp liên tiếp.

Sau khi chấm câu trắc nghiệm, UI giữ trạng thái đúng/sai trong khoảng 900 ms rồi tự chuyển sang bước kế tiếp. Nút chấm bị khóa và đổi thành “Tự chuyển…” trong khoảng này, nên không có lần bấm xác nhận thứ hai và cũng không thể cộng điểm hai lần.

Quy tắc của bài viết kiểm tra:

- Không có chữ mẫu chìm.
- Nét vẽ được chuẩn hóa thành mặt nạ nhị phân 64×64.
- Hệ thống so sánh khoảng cách hình dáng hai chiều với glyph mục tiêu và các chữ khác trong cùng nhóm.
- Nét quá ít, hình nguệch ngoạc, chữ khác hoặc kết quả có độ tin cậy thấp bị từ chối.
- Đáp án và nút tiếp tục chỉ xuất hiện khi chữ mục tiêu là kết quả gần nhất và vượt ngưỡng nhận diện.
- Khi bị từ chối, người học có thể hoàn tác, xóa hoặc viết lại rồi kiểm tra lại.
- Không có nút bỏ qua.

Nhận diện chạy hoàn toàn trong trình duyệt bằng Canvas và JavaScript, không gửi hình ảnh nét vẽ tới server. Thuật toán dùng chuẩn hóa tỷ lệ, mật độ mực, tỷ lệ khung chữ và khoảng cách hình học có dung sai, sau đó so khớp từng nét với dữ liệu KanjiVG để kiểm tra số nét, thứ tự và hướng. Đây là công cụ phản hồi phục vụ học tập, không phải bộ chấm thư pháp hoặc OCR machine learning tổng quát.

Phát âm là bước duy nhất trong toàn bộ luồng có nút bỏ qua.

## 7. Quy tắc lưu chữ đã thuộc

Phiên bản đầu từng lưu chữ quá sớm khi người học hoàn tất luyện viết có hướng dẫn. Logic này đã được thay đổi hoàn toàn.

Hiện tại:

- Luyện phát âm không lưu chữ đã thuộc.
- Luyện viết có hướng dẫn không lưu chữ đã thuộc.
- Luyện viết không mẫu của từng chữ không lưu chữ đã thuộc.
- Các bước 1 đến 7 của bài kiểm tra cuối không lưu chữ đã thuộc.
- Chỉ khi hoàn thành bước 8, toàn bộ chữ của nhóm mới được thêm vào `kana-known`.
- Nhóm bài chỉ được thêm vào `kana-completed-lessons` tại cùng thời điểm đó.

Migration `final-assessment-v1` reset một lần dữ liệu đã thuộc, bài đã hoàn thành và bài đang dở của phiên bản cũ để loại bỏ tiến độ từng được ghi quá sớm. Chuỗi ngày học không bị reset bởi migration này.

## 8. Lưu trữ tiến độ người dùng

Tiến độ nằm trong `localStorage` của trình duyệt:

| Khóa | Nội dung |
| --- | --- |
| `kana-known` | Danh sách chữ đã thuộc sau bài kiểm tra cuối |
| `kana-completed-lessons` | Danh sách nhóm bài đã hoàn thành |
| `kana-active-lesson` | Bài và vị trí đang học dở |
| `kana-study-streak` | Số ngày liên tiếp và ngày học gần nhất |
| `kana-mastery-schema` | Phiên bản quy tắc lưu mastery |

Tiến độ không nằm trong file dự án hoặc file ZIP. Chuyển ZIP sang máy khác sẽ chuyển ứng dụng, dữ liệu bài học và assets nhưng không chuyển tiến độ cá nhân của trình duyệt cũ.

## 9. Chuỗi ngày học

Chuỗi ngày học đã được reset về 0 thay vì bắt đầu giả định từ 7.

Quy tắc hiện tại:

- Bắt đầu từ 0.
- Chỉ tăng sau khi hoàn thành một nhóm bài.
- Chỉ tăng tối đa một lần trong cùng một ngày.
- Dùng ngày theo múi giờ `Asia/Bangkok`.
- Nếu bỏ một ngày, chuỗi bắt đầu lại từ 1 khi hoàn thành bài tiếp theo.

## 10. Luyện phát âm bằng giọng nói

Ứng dụng dùng Web Speech API với locale `ja-JP`:

- Người học nhìn Kana và nhấn microphone.
- Trình duyệt nhận giọng nói.
- Ứng dụng chuẩn hóa transcript và so sánh Kana hoặc romaji hợp lệ.
- Phát âm đúng mới mở nút chuyển sang luyện viết.
- Có thông báo riêng cho trường hợp không hỗ trợ API, không có microphone, bị từ chối quyền, không nghe thấy tiếng, lỗi mạng hoặc hết thời gian.
- Khi không thể sử dụng microphone, người học có thể bỏ qua riêng bước phát âm.

Ứng dụng không tự lưu file âm thanh. Một số trình duyệt có thể gửi audio tới dịch vụ nhận dạng của nhà cung cấp. Tính năng hoạt động tốt nhất trên Chrome hoặc Edge khi chạy qua HTTPS hoặc `http://localhost`.

## 11. Ôn tập thông minh

Ôn tập thông minh chỉ sử dụng dữ liệu từ `kana-known`:

- Thẻ ôn chỉ chứa chữ đã thuộc.
- Câu hỏi ôn chỉ lấy chữ đã thuộc.
- Cặp dễ nhầm chỉ xuất hiện khi cả hai chữ trong cặp đều đã thuộc.
- Khi chưa có chữ đã thuộc, khối nội dung ôn tập trên trang chủ bị ẩn.
- Thanh điều hướng vẫn luôn giữ đủ năm tab.
- Tab Ôn tập ở trạng thái khóa và làm mờ khi chưa có dữ liệu; tab tự mở sau khi người học hoàn thành bài kiểm tra cuối đầu tiên.
- Nếu route ôn tập được gọi bằng code khi chưa có dữ liệu, ứng dụng quay về trang chủ.

## 12. Thanh điều hướng và responsive

Thanh đáy luôn có năm cột:

1. Hôm nay.
2. Bảng chữ.
3. Học tập.
4. Ôn tập.
5. Hồ sơ.

Nút giữa dùng layout grid hai hàng độc lập:

- Hàng trên là dấu `練`.
- Hàng dưới là nhãn `Học tập`.
- Không dùng transform âm.
- Biểu tượng và nhãn không giao nhau.
- Các button kế bên không giao nhau.
- Có khoảng đệm `safe-area-inset-bottom`.

Các viewport đã được render và kiểm thử:

- iPhone SE đời đầu: `320×568`.
- iPhone SE: `375×667`.
- iPhone XS: `375×812`.
- Điện thoại hẹp: `360×800`.
- Điện thoại chính: `390×844`.
- Desktop: `1440×900`.

Trong các màn học tập trung, bottom navigation được ẩn để dành không gian cho bài học. Nội dung vẫn cuộn được tới CTA cuối, không bị mất dưới đáy màn hình và không tràn ngang.

## 13. Font và assets đóng gói

Toàn bộ font cần thiết đã được đặt trong `assets/fonts`:

- Be Vietnam Pro Regular, Medium, SemiBold, Bold và ExtraBold cho giao diện tiếng Việt.
- Noto Sans JP Variable cho Kana và chữ Nhật.
- Giấy phép SIL Open Font License 1.1 đi kèm từng bộ font.

Thông tin giấy phép tổng hợp nằm trong `FONT-LICENSES.md`. Không được xóa các file `OFL.txt` khi upload lên GitHub hoặc chuyển dự án.

Dữ liệu thứ tự nét nằm trong `kana-strokes.js`. Tác phẩm gốc KanjiVG của Ulrich Apel và dữ liệu phái sinh `fude-kana-data` được phân phối theo CC BY-SA 3.0. Attribution, tuyên bố thay đổi, LICENSE và NOTICE được đóng gói trong `KANA-STROKE-DATA-LICENSE.md` cùng `assets/stroke-data`.

## 14. Chạy dự án

### Cách nhanh nhất trên Windows

Giải nén ZIP và nhấn đúp `START-KANA-STUDIO.bat`.

### Mở trực tiếp

Có thể mở `index.html` bằng trình duyệt. Giao diện, database và font hoạt động offline. Microphone có thể bị giới hạn khi dùng URL `file://`.

### Chạy local server

Từ thư mục chứa dự án:

```powershell
node kana-studio/server.js
```

Sau đó mở:

```text
http://localhost:4173
```

## 15. Đưa lên GitHub Pages

1. Upload toàn bộ nội dung bên trong thư mục `kana-studio` lên repository.
2. Giữ nguyên cấu trúc `assets/fonts`.
3. Vào GitHub `Settings → Pages`.
4. Chọn `Deploy from a branch`.
5. Chọn branch `main` và thư mục `/ (root)`.

Dự án không cần lệnh build. GitHub Pages cũng giúp microphone có môi trường HTTPS phù hợp hơn so với mở file trực tiếp.

## 16. Kiểm thử và bằng chứng

Chạy smoke test:

```powershell
node kana-studio/tests/lesson-flow-smoke.mjs
```

Test tự động hiện kiểm tra:

- Reset mastery cũ bằng migration.
- Trạng thái chưa học có năm tab và Ôn tập bị khóa.
- Phát âm đúng và sai được phân biệt.
- Chỉ phát âm có thể bỏ qua.
- Mỗi chữ `あ・い・う・え・お` đi đúng thứ tự phát âm → animation → viết có mẫu → viết không mẫu.
- Nhận diện ở stage 5 phải đúng cả mặt chữ, thứ tự và hướng nét mới mở hành động chuyển chữ.
- Không lưu chữ trong lúc luyện viết.
- Assessment có đúng tám bước xen kẽ trắc nghiệm và viết.
- Dataset stroke-order có 176 Kana và dữ liệu chữ `あ` có đúng ba stroke.
- Sau mỗi lần phát âm, màn mẫu đúng chữ mục tiêu không có button và tự chuyển sang luyện viết có hướng dẫn.
- Màn mẫu được hủy an toàn khi đổi route và vẫn tự chuyển trong chế độ Reduce Motion.
- Assessment không mở lại màn mẫu và không có câu trắc nghiệm hoặc đáp án bị duplicate ở nhóm nguyên âm.
- Canvas kiểm tra không hiện đáp án trước khi vẽ.
- Hình chữ X ngẫu nhiên bị nhận diện là sai và không mở đáp án.
- Mặt nạ glyph đúng được nhận diện và mở trạng thái thành công.
- Trạng thái nhận diện dùng `role=status` và `aria-live` để thông báo cho công nghệ hỗ trợ.
- Không lưu mastery sau bảy bước đầu.
- Bước cuối lưu đúng năm chữ nguyên âm.
- Hoàn thành bài mới mở Hàng K.
- Streak tăng từ 0 lên 1 và không tăng hai lần trong cùng ngày.
- Ôn tập chỉ render và tạo câu hỏi từ các chữ đã thuộc.
- Tab Ôn tập tự mở sau khi có mastery.
- Năm tab không chồng lấn tại các viewport iPhone nhỏ.
- Biểu tượng `練` và nhãn Học tập không giao nhau.
- CTA cuối của các màn lesson, character, pronunciation, writing, quiz và draw test vẫn cuộn tới được.

Ảnh render và hồ sơ evidence nằm trong thư mục `evidence`. Hồ sơ `ui-evidence.json` có thể được kiểm tra bằng script evidence của môi trường phát triển.

## 17. Những lỗi đã sửa

- Sửa luồng bị kẹt sau khi người học kiểm tra nét viết.
- Thay dữ liệu demo bằng database và curriculum đầy đủ hơn.
- Thêm lộ trình nguyên âm từ đầu.
- Tăng kích thước romaji.
- Reset streak giả định từ 7 về 0 và đếm theo ngày thực tế.
- Đóng gói font và giấy phép để chạy offline.
- Thêm nhận giọng nói và kiểm tra phát âm.
- Thêm bài kiểm tra cuối nhóm gồm trắc nghiệm và viết không mẫu.
- Thêm màn animation thứ tự nét tự động sau phát âm và trước luyện viết có mẫu bằng dữ liệu KanjiVG đóng gói offline.
- Chuẩn hóa mỗi chữ thành năm stage bắt buộc, thêm trắc nghiệm mặt chữ trong nhóm và đưa luyện viết không mẫu có chấm nét vào stage 5 trước khi chuyển chữ.
- Bỏ bước xác nhận riêng sau khi viết không mẫu: sai viết lại, đúng báo đã học được cách viết.
- Cho trắc nghiệm tự chuyển sau khi hiện kết quả và giới hạn toàn bộ lựa chọn trong nhóm chữ đang kiểm tra.
- Sửa bộ sinh assessment để loại bỏ câu trắc nghiệm/đáp án trùng và tránh lặp liên tiếp ở nhóm chỉ có ba chữ.
- Thêm nhận diện mặt chữ offline để từ chối nét bất kỳ, hình nguệch ngoạc hoặc chữ không khớp.
- Đảm bảo chỉ phát âm có thể bỏ qua.
- Ngăn ghi mastery trước khi hoàn thành bài kiểm tra cuối.
- Reset một lần mastery cũ bị ghi sai.
- Lọc ôn tập theo chữ đã thuộc.
- Giữ tab Ôn tập bị khóa khi dữ liệu trống nhưng không làm thanh đáy co còn bốn nút.
- Sửa mất nhãn Học tập trên iPhone nhỏ.
- Tách nút `練` và nhãn Học tập thành hai hàng không overlap.
- Bổ sung safe area, khoảng đệm đáy và kiểm thử responsive.
- Đóng gói dự án, fonts, database, tài liệu và test để chuyển sang máy khác hoặc upload GitHub.

## 18. Giới hạn hiện tại

- Nhận diện chữ viết dùng so khớp hình dạng với glyph font và có thể yêu cầu viết lại nếu chữ viết tay quá cách điệu; hệ thống chưa chấm đúng thứ tự hoặc hướng từng nét.
- Dataset stroke-order có 176 Kana đơn; ký hiệu âm dài `ー` dùng một nét ngang trái sang phải định nghĩa trong ứng dụng, còn âm ghép được tạo từ các Kana thành phần.
- Web Speech API phụ thuộc trình duyệt và có thể phụ thuộc mạng.
- Không có đồng bộ tài khoản hoặc cloud; tiến độ chỉ tồn tại trong trình duyệt hiện tại.
- Chưa có backend, hệ thống đăng nhập, analytics hoặc push notification.
- Mnemonic và từ ví dụ chi tiết chưa được viết riêng cho mọi mục nâng cao; giao diện dùng nội dung fallback khi thiếu.

## 19. Checklist trước khi phát hành phiên bản tiếp theo

- Chạy `node --check kana-studio/app.js`.
- Chạy `node kana-studio/tests/lesson-flow-smoke.mjs`.
- Kiểm tra thanh đáy ở cả trạng thái Ôn tập khóa và mở.
- Render lại ít nhất iPhone SE, iPhone XS và desktop.
- Kiểm tra không có nội dung tràn ngang.
- Kiểm tra mọi CTA cuối màn có thể cuộn tới.
- Giữ nguyên cấu trúc `assets/fonts` và các giấy phép OFL.
- Không ghi `kana-known` trước bước cuối của assessment.
- Không đưa tiến độ cá nhân hoặc dữ liệu nhạy cảm vào file ZIP.
- Mỗi lần thay asset offline, tăng version query trong `index.html` và cập nhật build hiển thị ở màn Hồ sơ để tránh cache cũ.

## 20. Cấu trúc gói bàn giao

Gói ZIP cuối nên chứa nguyên thư mục `kana-studio`, bao gồm:

- Source HTML, CSS và JavaScript.
- Database Kana.
- Asset thứ tự nét, giấy phép CC BY-SA và script tái tạo asset.
- Font và giấy phép.
- Script chạy local.
- Smoke test.
- Ảnh evidence.
- README sử dụng nhanh.
- Tài liệu nghiên cứu thiết kế.
- Tài liệu bàn giao này.

Khi giải nén trên máy khác, không tách riêng các file khỏi cấu trúc thư mục vì CSS và JavaScript dùng đường dẫn tương đối.
