// TURKCE
export const locale = {
  lang: 'tr',
  data: {
    TRANSLATOR: {
      SELECT: 'Dilinizi seçin',
    },
    MENU: {
      DASHBOARD: 'Anasayfa',
      DEFINITIONS:"Tanımlar",
      APPS: 'Menu',
      GENERAL: 'Genel Tanımlamalar',
      MACHİNE:"Makina Tanımlama"

    },
    DASHBOARD: {
      BOOKSTYPES: 'Kitap Türleri',
      CRITICAL: 'Kritik miktar',
      ORDERSTITLE: 'Sipariş listesi',
      TRENDSTITLE: 'Aylık Trend Grafiği',
      DEFINITIONSDESC: 'Kullanıcılar, Roller ...',
      CUSTOMERSDESC: 'Kütüphane Bilgileri, Kitap Türleri ...',
      BOOKSDESC: 'Kitaplar, Kitap Listesi ...',

    },
    USERS: {
      USERNAME: 'Kullanıcı Kodu',
      USERCODE: 'Kod',
      EMAIL: 'E-posta',
      FIRSTNAME: 'Ad',
      LASTNAME: 'Soyad',
      EDIT: 'Düzelt',
      DELETE: 'Sil',
      ADD: 'Ekle',
      PASSWORD: 'Şifre',
      SAVE: 'Kaydet',
      CREATEDAT: 'Oluşturma Zamanı',
    },
    CUSTOMERS: {
      CUSTOMERSTITLE: 'Kütüphane',
      CUSTOMERSCODE: 'Kütüphane Kodu',
      CUSTOMERSNAME: 'Kütüphane Adı',
      DEFINITIONS: 'Kütüphane Tanımlama',
      CUSTOMERSCREATEDAT: 'Oluşturulma Zamanı',
      CUSTOMERSEDIT: 'Kütüphane Düzenleme',
      CUSTOMERSDELETE: 'Kütüphane Silme',
      CUSTOMERSTOTAL: 'Kütüphane Toplamı',
      CUSTOMERSSAVE: 'Kütüphane Kaydet',
      CUSTOMERSADD: 'Kütüphane Ekle',
      CUSTOMERSDETAILS: 'Kütüphane Detayları',
    },
    ROLES: {
      TITLE: 'Roller',
      ADD: 'Ekle',
      ROLECODE: 'Kod',
      ROLEDESC: 'Açıklama',
      CREATEDAT: 'Kayıt Zamanı',
      EDIT: 'Düzelt',
      DELETE: 'Sil',
      TOTAL: 'Toplam',
      SAVE: 'Kaydet'
    },
    AUTH: {
      GENERAL: {
        OR: 'Veya',
        SUBMIT_BUTTON: 'Gönder',
        NO_ACCOUNT: 'Hesabınız yok mu?',
        SIGNUP_BUTTON: 'Kayıt Ol',
        FORGOT_BUTTON: 'Şifreyi Unuttum',
        BACK_BUTTON: 'Geri',
        PRIVACY: 'Gizlilik',
        LEGAL: 'Hukuki',
        CONTACT: 'İletişim'
      },
      LOGIN: {
        TITLE: 'Hesaba Giriş',
        BUTTON: 'Giriş Yap',
      },
      FORGOT: {
        TITLE: 'Şifreyi Unuttum?',
        DESC: 'Şifrenizi sıfırlamak için e-postanızı girin',
        SUCCESS: 'Hesabınız başarıyla sıfırlandı.'
      },
      REGISTER: {
        TITLE: 'Kayıt Ol',
        DESC: 'Hesabınızı oluşturmak için bilgilerinizi girin',
        SUCCESS: 'Hesabınız başarıyla kaydedildi.'
      },
      INPUT: {
        EMAIL: 'E-posta',
        FULLNAME: 'Ad Soyad',
        PASSWORD: 'Şifre',
        CONFIRM_PASSWORD: 'Şifreyi Onayla',
        USERNAME: 'Kullanıcı Adı'
      },
      VALIDATION: {
        INVALID: '{{name}} geçerli değil',
        REQUIRED: '{{name}} zorunlu',
        MIN_LENGTH: '{{name}} minimum uzunluğu {{min}}',
        AGREEMENT_REQUIRED: 'Şartlar ve koşulları kabul etmek zorunludur',
        NOT_FOUND: 'İstenen {{name}} bulunamadı',
        INVALID_LOGIN: 'Giriş bilgisi yanlış',
        REQUIRED_FIELD: 'Zorunlu alan',
        MIN_LENGTH_FIELD: 'Minimum alan uzunluğu:',
        MAX_LENGTH_FIELD: 'Maksimum alan uzunluğu:',
        INVALID_FIELD: 'Alan geçerli değil',
      }
    },
    CONFIRM: {
      DELETEMSGTITLE: 'Seçili kayıt silinecek',
      DELETETEXT: 'Emin misin?',
      CONFIRMBUTTONTEXT: 'Evet',
      CANCELBUTTONTEXT: 'Hayır',
    },
    TYPESOFBOOKS: {
      TITLE: 'Kitap Türleri',
      CODE_TITLE: 'Kodu',
      NAME_TITLE: 'Açıklama'
    },
    BOOKS : {
      TITLE : 'Kitaplar',
      ADD : 'Yeni Kitap Ekle',
      EDIT : 'Düzelt',
      DELETE : 'Sil',
      TOTAL: 'Toplam Kitap ',
      CODE : 'Kodu',
      AUTHOR_NAME:'Yazar Adı',
      TITLE_OF_WORK:'Kitap Adı',
      EPCCODE : 'EPC Kodu',
      START : 'Başlat',
      ISBN: 'ISBN No',
      LC: 'LC',
      LANGUAGE: 'Dili',
      PLACEANDYEAR : 'Basım Yeri - Yılı',
      VOL : 'Cilt No',
      SUBJECT : 'Konu',
      NUMBEROFPAGES: 'Sayfa Sayısı',
      EXPLANATION: 'Açıklama'

    },
    STUDENTS : {
      TITLE :'Öğrenciler',
      ADD : 'Yeni Öğrenci Ekle',
      EDIT : 'Düzelt',
      DELETE : 'Sil',
      TOTAL : 'Toplam Öğrenci',
      CODE :'Öğrenci Kodu',
      NUMBER : 'Öğrenci Numarası',
      NAMEANDLASTNAME: 'Adı Soyadı',
      PHONENUMBER : 'Telefon Numarası',
      EMAIL :'E-Posta',
      FIRSTNAME :'Öğrenci Adı',
      LASTNAME :'Öğrenci Soyadı',
      ACTIVE :'Aktif/Pasif',
      IDENTIFICATIONNUMBER :'Kimlik Numarası',
      SAVE : 'Kaydet'
    },
    DEBITS: {
      TITLE :'Öğrencinin aldığı kitaplar',
      ADD : 'Yeni Zimmet Ekle',
      DELIVERY : 'Teslim Et',
      BORROW : 'Ödünç Al',
      CREATEDAT : 'Ödünç Alma Zamanı',
      ISDELIVERYHIDESHOW : 'Teslim Edilenleri Gizle',
      SAVE: 'Zimmet Kaydet',
      NOTBOOKSSELECT: 'Zimmet edilecek Kitap seçilmedi',
      BOOKSSELECT: 'Lütfen bir kitap seçiniz',
      TOTAL: 'Zimmet sayısı'
    },
    ALARMS: {
      TITLE :'Alarmlar',
      CREATEDAT : 'Oluşma Zamanı',
      TOTAL: 'Alarm sayısı'
    },
    KIOSK: {
      READYOURCARD : 'Lütfen kartınızı okutunuz..',
      ENTERYOURID : 'Kimlik numaranızı giriniz',
      LEAVETHESTAND : 'Kitapları standa bırakınız',
      LOGOUT : 'Çıkış'

    }
  }
};
