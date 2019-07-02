angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
   .state('menu.bLONTANG', {
    url: '/blontang',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bLONTANG.html',
        controller: 'bLONTANGCtrl'
      }
    }
  })
  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('menu.pesanan', {
    url: '/pengaturan',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pesanan.html',
        controller: 'pesananCtrl'
      }
    }
  })

  .state('keluar', {
    url: '/keluar',
    templateUrl: 'templates/keluar.html',
    controller: 'keluarCtrl'
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('lOGIN', {
    url: '/login',
    templateUrl: 'templates/lOGIN.html',
    controller: 'lOGINCtrl'
  })

  .state('lokasi', {
    url: '/lokasi',
    templateUrl: 'templates/lokasi.html',
    controller: 'lokasiCtrl'
  })

  .state('menu.editorBaju', {
    url: '/editor',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editorBaju.html',
        controller: 'editorBajuCtrl'
      }
    }
  })

  .state('editorTopi', {
    url: '/page17',
    templateUrl: 'templates/editorTopi.html',
    controller: 'editorTopiCtrl'
  })

  .state('editorMug', {
    url: '/page18',
    templateUrl: 'templates/editorMug.html',
    controller: 'editorMugCtrl'
  })

  .state('menu.editorCaseHP', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editorCaseHP.html',
        controller: 'editorCaseHPCtrl'
      }
    }
  })

  .state('tersimpan', {
    url: '/page8',
    templateUrl: 'templates/tersimpan.html',
    controller: 'tersimpanCtrl'
  })

  .state('menu.chatLangsung', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/chatLangsung.html',
        controller: 'chatLangsungCtrl'
      }
    }
  })

  .state('menu.chat', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/chat.html',
        controller: 'chatCtrl'
      }
    }
  })

  .state('menu.pILIHMEDIA', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pILIHMEDIA.html',
        controller: 'pILIHMEDIACtrl'
      }
    }
  })

  .state('cHECKOUT', {
    url: '/page12',
    templateUrl: 'templates/cHECKOUT.html',
    controller: 'cHECKOUTCtrl'
  })

  .state('privacyPolicy', {
    url: '/page13',
    templateUrl: 'templates/privacyPolicy.html',
    controller: 'privacyPolicyCtrl'
  })

  .state('menu.maafYa', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/maafYa.html',
        controller: 'maafYaCtrl'
      }
    }
  })

  .state('menu.detailPesanan', {
    url: '/page15',
    views: {
      'side-menu21': {
        templateUrl: 'templates/detailPesanan.html',
        controller: 'detailPesananCtrl'
      }
    }
  })

  .state('mediaSosial', {
    url: '/page16',
    templateUrl: 'templates/mediaSosial.html',
    controller: 'mediaSosialCtrl'
  })

  .state('menu.pendaftaran', {
    url: '/page19',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pendaftaran.html',
        controller: 'pendaftaranCtrl'
      }
    }
  })
   .state('laporkan', {
    url: '/laporkan',
    templateUrl: 'templates/laporkan.html',
    controller: 'laporkanCtrl'
  })

  .state('laporkan2', {
    url: '/laporkan2',
    templateUrl: 'templates/laporkan2.html',
    controller: 'laporkan2Ctrl'
  })

  .state('laporkan3', {
    url: '/laporkan3',
    templateUrl: 'templates/laporkan3.html',
    controller: 'laporkan3Ctrl'
  })

  .state('lapokan4', {
    url: '/laporkan4',
    templateUrl: 'templates/lapokan4.html',
    controller: 'lapokan4Ctrl'
  })

  .state('ulasBisnis', {
    url: '/swasta',
    templateUrl: 'templates/ulasBisnis.html',
    controller: 'ulasBisnisCtrl'
  })

  .state('review', {
    url: '/review',
    templateUrl: 'templates/review.html',
    controller: 'reviewCtrl'
  })

  .state('pilihFoto', {
    url: '/pilihfoto',
    templateUrl: 'templates/pilihFoto.html',
    controller: 'pilihFotoCtrl'
  })

  .state('profil', {
    url: '/profil',
    templateUrl: 'templates/profil.html',
    controller: 'profilCtrl'
  })

  .state('profilDetaile', {
    url: '/profildetaile',
    templateUrl: 'templates/profilDetaile.html',
    controller: 'profilDetaileCtrl'
  })

  .state('admin', {
    url: '/adminhome',
    templateUrl: 'templates/admin.html',
    controller: 'adminCtrl'
  })

  .state('laporan', {
    url: '/laporanadmin',
    templateUrl: 'templates/laporan.html',
    controller: 'laporanCtrl'
  })

  .state('page', {
    url: '/Admindetail',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  .state('page2', {
    url: '/kirimtanggapan',
    templateUrl: 'templates/page2.html',
    controller: 'page2Ctrl'
  })
  .state('komentar', {
    url: '/komentar',
    templateUrl: 'templates/komentar.html',
    controller: 'komentarCtrl'
  })
  
$urlRouterProvider.otherwise('/login')


});