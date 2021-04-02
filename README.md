# angularjs-tc-no-validation

AngularJS için TC kimlik numarası doğrulama directive'i

**Birinci** örnek sadece directive ile TC no doğrulaması yapar ve input her değiştiğinde durum mesajı gösterilir.

**İkinci** örnekte **[angular-ui-mask](https://github.com/angular-ui/ui-mask)** kullanılmıştır. Bu durumda öncelik ui-mask'indir.
- İlk önce `mask` ile 11 haneli `99999999999` pattern'ı doğrulanmalıdır. Doğrulandıktan sonra TC no directive'i çalışır.
- `ui-mask` kendi placeholder'ını kullanır.
- `ui-mask`'in ayarları `tcNoValidation` directive'inin çalışma şeklini etkileyebilir.


# Algoritma

- Kural-1: Tüm karakterleri rakam olmalıdır.
- Kural-2: TC Kimlik numarası 11 basamaktan oluşmalıdır.
- Kural-3: İlk hanesi 0 olamaz.
- Kural-4: İlk 9 basamak arasındaki algoritma, 10. basmağı vermelidir.
- İşlem: 1. 3. 5. 7. ve 9. hanelerin toplamının 7 katından, 2. 4. 6. ve 8. hanelerin toplamı çıkartıldığında, elde edilen sonucun 10′a bölümünden kalan, yani Mod10′u bize 10. haneyi verir.
- Kural-5: İlk 10 basamak arasındaki algoritma, 11. basamağı vermelidir.
- İşlem: 1. 2. 3. 4. 5. 6. 7. 8. 9. ve 10. hanelerin toplamından elde edilen sonucun 10′a bölümünden (Mod 10) kalan, bize 11. haneyi verir.


# Uyarı

Bu directive inputa girilen değeri algoritmik olarak doğrular. Girilen değerin gerçekten birine ait olduğu veya geçerli olup olmadığı bilgisini **[NVI SOAP API](https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx)** ile öğrenmek mümkün. TC no kontrolü için API bizden tc no, ad, soyad, ve doğum yılı bilgilerini istiyor.

Ayrıca form validation sadece client tarafında değil aynı zamanda backend tarafında da yapılmalıdır.


# Backend için kütüphaneler

- **[PHP](https://github.com/EgoistDeveloper/tccheck)**