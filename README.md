# Kana Studio

Prototype mobile-first để học nhận mặt chữ và luyện viết toàn bộ Hiragana/Katakana.

## Chạy ứng dụng

Không cần cài dependency. Mở `index.html` trực tiếp, hoặc chạy local server:

```powershell
node kana-studio/server.js
```

Sau đó mở `http://localhost:4173`.

## Đưa lên GitHub Pages

1. Upload toàn bộ nội dung thư mục `kana-studio` lên repository.
2. Vào **Settings → Pages**.
3. Chọn **Deploy from a branch**, branch `main`, thư mục `/ (root)`.
4. Không di chuyển riêng thư mục `assets`: CSS sử dụng đường dẫn tương đối tới font bên trong đó.

Ứng dụng không cần build step và không tải asset từ CDN.

Build offline hiện tại là `2026.11.18.6 · Stroke order flow`. Giá trị này hiển thị cuối màn Hồ sơ. Các file CSS/JS có version query để trình duyệt không tiếp tục dùng asset cũ sau khi cập nhật ZIP; sau khi chép đè bản mới, hãy đóng tab cũ và mở lại `index.html`.

### Yêu cầu cho luyện phát âm

- Nên mở app bằng GitHub Pages hoặc `http://localhost` để trình duyệt cấp quyền microphone đúng cách.
- Chrome/Edge là lựa chọn tương thích tốt nhất; app cũng kiểm tra `webkitSpeechRecognition` cho các bản Chromium cũ.
- Một số trình duyệt dùng dịch vụ nhận dạng qua mạng, nên phần luyện phát âm có thể cần Internet dù giao diện, font và DB vẫn chạy offline.
- Kana Studio không lưu bản ghi âm. Tùy trình duyệt, audio có thể được gửi tới nhà cung cấp dịch vụ speech recognition.
- Nếu API không được hỗ trợ, microphone bị chặn hoặc mất mạng, app hiển thị nguyên nhân và cho phép bỏ qua để không khóa bài học.

## Các luồng đã làm

- Hôm nay: chuỗi ngày học, bài tiếp theo, lộ trình khóa/mở theo tiến độ, chữ cần ôn. Khối ôn tập chỉ xuất hiện sau khi đã học ít nhất một chữ.
- Lộ trình từ đầu: `あ → い → う → え → お`, sau đó Hàng K, S, T...; hoàn thành Hiragana trước khi sang Katakana.
- 54 nhóm bài học lấy từ `kana-db.js`, bao phủ chữ cơ bản, biến âm, âm ghép, kana nhỏ và ký hiệu của cả hai bảng.
- Bảng chữ: chuyển Hiragana/Katakana và lọc 46 chữ cơ bản, 25 biến âm, 33 âm ghép, ký hiệu/kana nhỏ.
- Chi tiết chữ: âm đọc, mẹo ghi nhớ, từ ví dụ, phát âm bằng Web Speech API.
- Luyện phát âm: nhìn Kana, nói vào microphone và đối chiếu kết quả `ja-JP`; phát âm đúng mới mở bước luyện viết.
- Mỗi chữ có đúng năm stage: `Học phát âm → Animation thứ tự nét → Trắc nghiệm mặt chữ trong nhóm hiện tại → Luyện viết có mẫu → Luyện viết không mẫu`. Chỉ hoàn thành stage 5 mới chuyển sang chữ kế tiếp.
- Luyện viết có mẫu dùng canvas cảm ứng, chữ mờ, hoàn tác, xóa và ẩn/hiện mẫu. Animation dùng dữ liệu KanjiVG và tự chuyển tiếp, không có nút hoặc tương tác bắt buộc; Reduce Motion sẽ hiện mẫu hoàn chỉnh trong thời gian ngắn.
- Cả hai bước viết đều kiểm tra mặt chữ, số nét, thứ tự và hướng từng nét bằng dữ liệu stroke-order cục bộ. Popup phân biệt lỗi mặt chữ với lỗi nét; sai ba lần liên tiếp sẽ quay về animation thứ tự nét.
- Kiểm tra cuối cụm: 4 vòng, mỗi vòng gồm một câu trắc nghiệm và một bài viết Kana từ romaji trên canvas trắng. Animation không lặp lại trong assessment.
- Bộ sinh assessment không lặp chữ trắc nghiệm trong nhóm có ít nhất 4 chữ; đáp án trong mỗi câu luôn duy nhất và chỉ lấy từ chính nhóm chữ đang kiểm tra. Nhóm 3 chữ hiển thị 3 lựa chọn thuộc nhóm, vẫn đủ 4 vòng nhưng không lặp cùng chữ ở hai câu liên tiếp.
- Sau khi chấm một câu trắc nghiệm, kết quả đúng/sai hiển thị ngắn rồi app tự chuyển sang bước tiếp theo; người học không cần bấm xác nhận lần hai.
- Bài viết kiểm tra chuẩn hóa nét vẽ thành mặt nạ hình dạng, so sánh hai chiều với glyph mục tiêu và các chữ gây nhiễu trong cùng bài. Chỉ khi chữ mục tiêu là kết quả gần nhất và vượt ngưỡng tin cậy, đáp án cùng nút tiếp tục mới xuất hiện. Nét quá ít, hình nguệch ngoạc hoặc chữ khác bị từ chối; không có nút bỏ qua.
- Ôn tập thông minh: chỉ tạo thẻ, cặp dễ nhầm và câu hỏi từ các chữ có trong tiến độ `kana-known`. Thanh đáy luôn giữ đủ 5 tab; Ôn tập ở trạng thái khóa khi chưa thuộc chữ nào và tự mở sau bài kiểm tra cuối.
- Hồ sơ: thống kê và tiến độ hai bảng chữ.

Thanh điều hướng đáy luôn dùng lưới 5 cột, có nhãn “Học tập” hiển thị cố định, vùng chạm tối thiểu 44px và khoảng đệm theo `safe-area-inset-bottom`. Nút giữa dùng grid hai hàng độc lập cho dấu `練` và nhãn, không dùng transform âm; smoke test đo bounding box để chặn giao nhau giữa hai phần và giữa các tab kế bên. Responsive test bao phủ iPhone SE `375×667`, iPhone XS `375×812` và iPhone SE đời đầu `320×568`; các màn giới thiệu, chi tiết chữ, phát âm, viết, trắc nghiệm và viết kiểm tra đều cuộn tới được CTA cuối mà không tràn ngang.
- Chuỗi ngày học bắt đầu từ 0 và chỉ tăng khi hoàn thành một nhóm bài; tối đa một lần mỗi ngày theo múi giờ Asia/Bangkok.

Tiến độ được lưu cục bộ trong `localStorage`. Một chữ chỉ được ghi vào danh sách đã thuộc sau khi người học hoàn thành toàn bộ assessment cuối nhóm; cả năm stage của từng chữ và các bước assessment chưa hoàn tất đều không ghi sớm mastery. Nhận diện chữ viết và kiểm tra thứ tự nét chạy cục bộ, không gửi ảnh nét vẽ ra ngoài. Đây là bộ so khớp hình học có dung sai phục vụ học tập, không phải công cụ chấm thư pháp chuyên dụng.

Các khóa tiến độ gồm `kana-known`, `kana-completed-lessons`, `kana-active-lesson`, `kana-study-streak` và khóa migration `kana-mastery-schema`. Bản `final-assessment-v1` reset dữ liệu đã thuộc/hoàn thành cũ một lần để loại bỏ tiến độ từng được ghi trước bài test cuối; chuỗi ngày học không bị reset.

## Font đóng gói

- Be Vietnam Pro: giao diện tiếng Việt, các weight 400–800.
- Noto Sans JP Variable: Kana và ký tự Nhật, weight 100–900.
- Cả hai được phát hành theo SIL Open Font License 1.1. Xem [FONT-LICENSES.md](FONT-LICENSES.md) và các file `OFL.txt` trong `assets/fonts`.

## Dữ liệu thứ tự nét

- `kana-strokes.js` đóng gói 176 bản ghi stroke-order để chạy offline, gồm các điểm theo đúng thứ tự nét.
- Dữ liệu được tạo từ KanjiVG thông qua `fude-kana-data` và phân phối theo CC BY-SA 3.0.
- Với âm ghép, từng Kana được bố trí chung trên canvas và phát stroke từ trái sang phải.
- Xem [KANA-STROKE-DATA-LICENSE.md](KANA-STROKE-DATA-LICENSE.md), `assets/stroke-data/LICENSE` và `assets/stroke-data/NOTICE`.
- Có thể tái tạo asset bằng `tools/build-kana-strokes.mjs` từ bản nguồn tương thích.

## Kiểm thử luồng học

```powershell
node kana-studio/tests/lesson-flow-smoke.mjs
```

Test headless kiểm tra đủ năm stage cho từng chữ `あ・い・う・え・お`, giới hạn trắc nghiệm trong nhóm hiện tại, phân biệt sai mặt chữ/thứ tự/hướng nét và quay về xem nét sau ba lần sai; `kana-known` vẫn rỗng đến bước assessment cuối cùng.

