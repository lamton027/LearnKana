KANA STUDIO - BAN PORTABLE OFFLINE
=================================

CACH SU DUNG TREN PC KHAC

1. Giai nen toan bo file ZIP vao mot thu muc.
2. Nhan dup START-KANA-STUDIO.bat.
3. Neu Windows hoi chon trinh duyet, hay chon Chrome, Edge hoac Firefox.

BAN HIEN TAI: 2026.11.18.6 - Stroke order flow
Neu da mo mot ban cu, hay dong tab cu roi mo lai index.html sau khi giai nen.

Ban cung co the mo truc tiep file index.html. Ung dung khong can Node.js,
khong can cai dat. Giao dien, font va DB hoat dong offline.

LUYEN PHAT AM

Tinh nang microphone hoat dong tot nhat khi app duoc phuc vu qua HTTPS
(vi du GitHub Pages) hoac http://localhost. Mot so trinh duyet can Internet
de nhan dang giong noi. Neu mo truc tiep index.html va microphone bi chan,
app se cho phep bo qua buoc phat am de tiep tuc.

LUONG HOC MOI CHU

Moi chu luon di qua 5 stage: Hoc phat am -> Animation thu tu net ->
Trac nghiem mat chu trong nhom hien tai -> Luyen viet co mau -> Luyen viet
khong mau. Hai buoc viet kiem tra mat chu, so net, thu tu va huong net ngay
tren thiet bi. Sai 3 lan lien tiep se quay ve xem animation thu tu net.

Trac nghiem hien ket qua ngan roi tu dong chuyen tiep. Tat ca lua chon deu
thuoc chinh nhom chu dang kiem tra, khong tron dap an tu nhom khac.

DU LIEU TIEN DO

Tien do duoc luu trong localStorage cua trinh duyet tren tung PC. File ZIP
chi chua ung dung va du lieu bai hoc, khong chua tien do ca nhan tu PC cu.
Xoa du lieu trinh duyet co the lam mat tien do.

Ban final-assessment-v1 se reset du lieu "da thuoc" va bai da hoan thanh cu
mot lan. Tu do, chu chi duoc luu la "da thuoc" sau khi hoan tat toan bo bai
kiem tra cuoi nhom. Chuoi ngay hoc van duoc giu nguyen.

CAC FILE CAN THIET

- index.html       Giao dien chinh
- styles.css       Kieu giao dien va font offline
- app.js           Logic bai hoc, quiz va luu tien do
- kana-db.js       Toan bo du lieu Hiragana/Katakana
- kana-strokes.js  Du lieu thu tu net Kana chay offline
- assets/fonts/    Font tieng Viet, font tieng Nhat va giay phep OFL
- assets/stroke-data/  Giay phep va NOTICE cua du lieu KanjiVG

GOI Y

Nen giu tat ca file va thu muc assets trong cung cau truc. Khong doi ten,
khong tach rieng file va khong xoa cac file OFL.txt.


