import Vue from "vue";
import Router from "vue-router";
import DashboardLayoutGoverment from "@/layout/Goverment/DashboardLayout";
import DashboardLayoutSchool from "@/layout/School/DashboardLayout";
import VueMeta from "vue-meta";

import DashboardDetailSekolah from "@/layout/Goverment/DashboardDetailSekolah";
import DashboardDetailTableSekolah from "@/layout/Goverment/DashboardDetailTableSekolah";

import AuthLayout from "@/layout/AuthLayout";
Vue.use(Router);
Vue.use(VueMeta);

export default new Router({
  linkExactActiveClass: "actsudo sive",
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "login",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "login" */ "./views/Login.vue"),
        },
      ],
    },

    // Klasmonitoring Pemerintah
    {
      path: "/pemerintah",
      redirect: "klasmonitoring",
      component: DashboardLayoutGoverment,
      meta: { requiresAuth: true, schoolAuth: false, govAuth: true },
      children: [
        {
          path: "/klasmonitoring",
          name: "Klasmonitoring",
          meta: {
            title: "Klasmonitoring",
          },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ "./views/Goverment/Dashboard.vue"
            ),
        },
        {
          path: "/monitoring/sekolah",
          name: "Sekolah",
          meta: {
            title: "Monitoring Sekolah",
          },
          component: () =>
            import(
              /* webpackChunkName: "monitoring_sekolah" */ "./views/Goverment/Dashboard/MonitoringSekolah.vue"
            ),
        },
        {
          path: "/monitoring/pelajar",
          name: "MonitoringPelajar",
          meta: {
            title: "Pelajar",
          },
          component: () =>
            import(
              /* webpackChunkName: "monitoring_pelajar" */ "./views/Goverment/Dashboard/MonitoringPelajar.vue"
            ),
        },
        {
          path: "/monitoring/guru-staff",
          name: "MonitoringGuruStaff",
          meta: {
            title: "Guru & Staff",
          },
          component: () =>
            import(
              /* webpackChunkName: "monitoring_guru" */ "./views/Goverment/Dashboard/MonitoringGuruStaff.vue"
            ),
        },
        {
          path: "/monitoring/materi",
          name: "MonitoringMateri",
          meta: {
            title: "Materi",
          },
          component: () =>
            import(
              /* webpackChunkName: "monitoring_materi" */ "./views/Goverment/Dashboard/MonitoringMateri.vue"
            ),
        },
        {
          path: "/monitoring/tugas",
          name: "MonitoringTugas",
          meta: {
            title: "Tugas",
          },
          component: () =>
            import(
              /* webpackChunkName: "monitoring_tugas" */ "./views/Goverment/Dashboard/MonitoringTugas.vue"
            ),
        },
        {
          path: "/monitoring/ujian",
          name: "MonitoringUjian",
          meta: {
            title: "Ujian",
          },
          component: () =>
            import(
              /* webpackChunkName: "monitoring_ujian" */ "./views/Goverment/Dashboard/MonitoringUjian.vue"
            ),
        },
        {
          path: "/monitoring/jadwal-ujian",
          name: "MonitoringJadwalUjian",
          meta: {
            title: "Jadwal Ujian",
          },
          component: () =>
            import(
              /* webpackChunkName: "monitoring_jadwal_ujian" */ "./views/Goverment/Dashboard/MonitoringJadwalUjian.vue"
            ),
        },
        {
          path: "/monitoring/mapel",
          name: "MataPelajaran",
          meta: {
            title: "Mata Pelajaran",
          },
          component: () =>
            import(
              /* webpackChunkName: "monitoring_mapel" */ "./views/Goverment/Dashboard/MonitoringMapel.vue"
            ),
        },
        {
          path: "/klaspustaka",
          name: "Perpustakaan",
          meta: {
            title: "Perpustakaan",
          },
          component: () =>
            import(
              /* webpackChunkName: "monitoring_perpustakaan" */ "./views/Goverment/Perpustakaan/Klaspustaka.vue"
            ),
        },
        {
          path: "/perpustakaan/klaspustaka",
          name: "Klaspustaka",
          meta: {
            title: "Klaspustaka",
          },
          component: () =>
            import(
              /* webpackChunkName: "monitoring_klaspustaka" */ "./views/Goverment/Perpustakaan/Perpustakaan/Perpustakaan.vue"
            ),
        },
        {
          path: "/perpustakaan/jumlah-buku",
          name: "JumlahBuku",
          meta: {
            title: "Jumlah Buku",
          },
          component: () =>
            import(
              /* webpackChunkName: "jumlah_buku" */ "./views/Goverment/Perpustakaan/Jumlahbuku/JumlahBuku.vue"
            ),
        },
        {
          path: "/perpustakaan/buku-baru",
          name: "BukuBaru",
          meta: {
            title: "Buku Baru",
          },
          component: () =>
            import(
              /* webpackChunkName: "buku_baru" */ "./views/Goverment/Perpustakaan/Bukubaru/BukuBaru.vue"
            ),
        },
        {
          path: "/perpustakaan/buku-rusak",
          name: "BukuRusak",
          meta: {
            title: "Buku Rusak",
          },
          component: () =>
            import(
              /* webpackChunkName: "buku_rusak" */ "./views/Goverment/Perpustakaan/Bukurusak/BukuRusak.vue"
            ),
        },
        // {
        //   path: "/profile",
        //   name: "profile",
        //   component: () =>
        //     import(/* webpackChunkName: "demo" */ "./views/UserProfile.vue"),
        // },
        {
          path: "/presensi",
          name: "Presensi",
          meta: {
            title: "Presensi",
          },
          component: () =>
            import(
              /* webpackChunkName: "presensi" */ "./views/Goverment/Presensi/Presensi.vue"
            ),
        },
        {
          path: "/presensi/kehadiran",
          name: "Kehadiran",
          meta: {
            title: "Kehadiran",
          },
          component: () =>
            import(
              /* webpackChunkName: "presensi_kehadiran" */ "./views/Goverment/Presensi/Kehadiran/Kehadiran.vue"
            ),
        },

        {
          path: "/presensi/terlambat",
          name: "Terlambat",
          meta: {
            title: "Terlambat",
          },
          component: () =>
            import(
              /* webpackChunkName: "presensi_terlambat" */ "./views/Goverment/Presensi/Terlambat/Terlambat.vue"
            ),
        },
        {
          path: "/presensi/keluar-awal",
          name: "KeluarAwal",
          meta: {
            title: "Keluar Awal",
          },
          component: () =>
            import(
              /* webpackChunkName: "presensi_keluar_awal" */ "./views/Goverment/Presensi/Keluarawal/Keluarawal.vue"
            ),
        },
        {
          path: "/presensi/alpa",
          name: "Alpa",
          meta: {
            title: "Alpa",
          },
          component: () =>
            import(
              /* webpackChunkName: "presensi_alpa" */ "./views/Goverment/Presensi/Alpa/Alpa.vue"
            ),
        },

        {
          path: "/menu-lainnya",
          name: "MenuLainnya",
          meta: {
            title: "Menu Lainnya",
          },
          component: () =>
            import(
              /* webpackChunkName: "menu_lainnya" */ "./views/Goverment/MenuLainnya/MenuLainya.vue"
            ),
        },
        {
          path: "/pengaturan",
          name: "Pengaturan",
          meta: {
            title: "Pengaturan",
          },
          component: () =>
            import(
              /* webpackChunkName: "pengaturan" */ "./views/Goverment/Pengaturan/Pengaturan.vue"
            ),
        },
        {
          path: "/sosial-media",
          name: "SosialMedia",
          meta: {
            title: "Sosial Media",
          },
          component: () =>
            import(
              /* webpackChunkName: "sosial_media" */ "./views/Goverment/SosialMedia/SosialMedia.vue"
            ),
        },
        {
          path: "/sosial-media/total-data",
          name: "SosialMediaTotalData",
          meta: {
            title: "Total Data",
          },
          component: () =>
            import(
              /* webpackChunkName: "total_data" */ "./views/Goverment/SosialMedia/TotalData/TotalData.vue"
            ),
        },
        {
          path: "/sosial-media/postingan",
          name: "SosialMediaPosting",
          meta: {
            title: "Postingan",
          },
          component: () =>
            import(
              /* webpackChunkName: "postingan" */ "./views/Goverment/SosialMedia/Postingan/Postingan.vue"
            ),
        },
        {
          path: "/sosial-media/hastag",
          name: "SosialMediaHastag",
          meta: {
            title: "Hastag",
          },
          component: () =>
            import(
              /* webpackChunkName: "hastag" */ "./views/Goverment/SosialMedia/Hastag/Hastag.vue"
            ),
        },
        {
          path: "/sosial-media/ebook",
          name: "SosialMediaEbook",
          meta: {
            title: "Posting Ebook",
          },
          component: () =>
            import(
              /* webpackChunkName: "postingan_ebook" */ "./views/Goverment/SosialMedia/Ebook/Ebook.vue"
            ),
        },

        {
          path: "/detail/:id/product/:productName",
          name: "DetailPenggunaProduct",
          meta: {
            title: "PRODUK",
          },
          component: () =>
            import(
              /* webpackChunkName: "produk" */ "./views/Goverment/Dashboard/DetailPenggunaProduk/DetailPenggunaProduk.vue"
            ),
        },
        // {
        //   path: "/print/monitoring/sekolah",
        //   name: "PrintMonitoringSekolah",
        //   meta: {
        //     title: "Print Moinitoring Sekolah",
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "demo" */ "./views/Goverment/Dashboard/RekapData/PrintMonitoringSekolah.vue"
        //     ),
        // },
      ],
    },

    {
      path: "/print/monitoring/sekolah",
      name: "PrintMonitoringSekolah",
      meta: {
        title: "Print Moinitoring Sekolah",
      },
      component: () =>
        import(
          /* webpackChunkName: "print_monitoring_sekolah" */ "./views/Goverment/Dashboard/RekapData/PrintMonitoringSekolah.vue"
        ),
    },
    {
      path: "/print/monitoring/pelajar",
      name: "PrintMonitoringPelajar",
      meta: {
        title: "Print Moinitoring Pelajar",
      },
      component: () =>
        import(
          /* webpackChunkName: "demo" */ "./views/Goverment/Dashboard/RekapData/PrintMonitoringPelajar.vue"
        ),
    },
    // {
    //   path: "/monitoring/detail/sekolah/:id",
    //   redirect: "Detail Sekolah",
    //   component: DashboardDetailSekolah,
    //   children: [
    //     {
    //       path: "/monitoring/detail/sekolah/:id",
    //       name: "Detail Sekolah",
    //       component: () =>
    //         import(
    //           /* webpackChunkName: "demo" */ "./views/Goverment/Dashboard/DetailSekolah/DetailSekolah.vue"
    //         ),
    //     },
    //   ],
    // },

    // Klasmonitoring Pemerintah | Detail sekolah pada dashboard
    {
      path: "/detail/sekolah/:id",
      redirect: "Detail Sekolah",
      component: DashboardDetailSekolah,
      children: [
        {
          path: "/detail/sekolah/:id",
          name: "DetailSekolah",
          meta: {
            title: "Detail Sekolah",
          },
          component: () =>
            import(
              /* webpackChunkName: "detail_sekolah" */ "./views/Goverment/Dashboard/DetailSekolah/DetailSekolah.vue"
            ),
        },
        // {
        //   path: "/detail/sekolah/:id/pelajar",
        //   name: "DetailPelajar",
        //   meta: {
        //     title: "Detail Pelajar",
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "demo" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringPelajar.vue"
        //     ),
        // },
        // {
        //   path: "/detail/sekolah/:id/guru",
        //   name: "DetailGuru",
        //   meta: {
        //     title: "Detail Guru",
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "demo" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringGuru.vue"
        //     ),
        // },
        // {
        //   path: "/detail/sekolah/:id/materi",
        //   name: "DetailMateri",
        //   meta: {
        //     title: "Detail Materi",
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "demo" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringMateri.vue"
        //     ),
        // },
        // {
        //   path: "/detail/sekolah/:id/tugas",
        //   name: "DetailTugas",
        //   meta: {
        //     title: "Detail Tugas",
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "demo" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringTugas.vue"
        //     ),
        // },
        // {
        //   path: "/detail/sekolah/:id/ujian",
        //   name: "DetailUjian",
        //   meta: {
        //     title: "Detail Ujian",
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "demo" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringUjian.vue"
        //     ),
        // },
        // {
        //   path: "/detail/sekolah/:id/buku-pustaka",
        //   name: "DetailBukuPustaka",
        //   meta: {
        //     title: "Detail Buku Pustaka",
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "demo" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringPustaka.vue"
        //     ),
        // },
      ],
    },
    {
      path: "/detail/sekolah/:id/pelajar",
      redirect: "Detail Pelajar",
      component: DashboardDetailTableSekolah,
      children: [
        {
          path: "/detail/sekolah/:id/pelajar",
          name: "DetailPelajar",
          meta: {
            title: "Detail Pelajar",
          },
          component: () =>
            import(
              /* webpackChunkName: "detail_pelajar" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringPelajar.vue"
            ),
        },
        {
          path: "/detail/sekolah/:id/guru",
          name: "DetailGuru",
          meta: {
            title: "Detail Guru",
          },
          component: () =>
            import(
              /* webpackChunkName: "detail_guru" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringGuru.vue"
            ),
        },
        {
          path: "/detail/sekolah/:id/materi",
          name: "DetailMateri",
          meta: {
            title: "Detail Materi",
          },
          component: () =>
            import(
              /* webpackChunkName: "detail_materi" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringMateri.vue"
            ),
        },
        {
          path: "/detail/sekolah/:id/tugas",
          name: "DetailTugas",
          meta: {
            title: "Detail Tugas",
          },
          component: () =>
            import(
              /* webpackChunkName: "detail_tugas" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringTugas.vue"
            ),
        },
        {
          path: "/detail/sekolah/:id/ujian",
          name: "DetailUjian",
          meta: {
            title: "Detail Ujian",
          },
          component: () =>
            import(
              /* webpackChunkName: "detail_ujian" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringUjian.vue"
            ),
        },
        {
          path: "/detail/sekolah/:id/buku-pustaka",
          name: "DetailBukuPustaka",
          meta: {
            title: "Detail Buku Pustaka",
          },
          component: () =>
            import(
              /* webpackChunkName: "detail_buku_pustaka" */ "./views/Goverment/Dashboard/DetailSekolah/DetailMonitoringPustaka.vue"
            ),
        },
      ],
    },

    // Klasmonitoring Pemerintah | Detail sekolah pada sosial media
    {
      path: "/sosial-media/total-data/:id/detail",
      redirect: "Detail Sosial media",
      component: DashboardDetailSekolah,
      children: [
        {
          path: "/sosial-media/total-data/:id/detail",
          name: "DetailSosialMedia",
          meta: {
            title: "Detail Sosial Media",
          },
          component: () =>
            import(
              /* webpackChunkName: "sosial_media" */ "./views/Goverment/SosialMedia/TotalData/DetailTotalData/DetailTotalData.vue"
            ),
        },
      ],
    },

    // Klasmonitoring Sekolah
    {
      path: "/klasmonitoring/sekolah/new",
      name: "KlasmonitoringSekolahNew",
      meta: {
        layout: "fullScreen",
        title: "Monitoring Sekolah",
        hideFooter: true,
      },
      component: () => import("./views/School/DashboardFullScreen.vue"),
    },
    {
      path: "/sekolah",
      redirect: "Klasmonitoring Sekolah",
      component: DashboardLayoutSchool,
      meta: { requiresAuth: true, schoolAuth: true, govAuth: false },

      children: [
        {
          path: "/klasmonitoring/sekolah",
          name: "KlasmonitoringSekolah",
          meta: {
            title: "Klasmonitoring Sekolah",
          },
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "monitoring_sekolah" */ "./views/School/Dashboard.vue"
            ),
        },
        {
          path: "/menu",
          name: "MenuLainnyaSchool",
          meta: {
            title: "Menu Lainnya",
          },
          component: () =>
            import(
              /* webpackChunkName: "menu_lainnya_sekolah" */ "./views/School/MenuLainnya/MenuLainya.vue"
            ),
        },
        {
          path: "/pengaturan-akun",
          name: "PengaturanSchool",
          meta: {
            title: "Pengaturan",
          },
          component: () =>
            import(
              /* webpackChunkName: "pengaturan" */ "./views/School/Pengaturan/Pengaturan.vue"
            ),
        },
        // {
        //   path: "/sekolah",
        //   name: "Sekolah",
        //   meta: {
        //     title: "Sekolah",
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "demo" */ "./views/School/Dashboard/MonitoringSekolah.vue"
        //     ),
        // },
        {
          path: "/pelajar",
          name: "Pelajar",
          meta: {
            title: "Pelajar",
          },
          component: () =>
            import(
              /* webpackChunkName: "pelajar" */ "./views/School/Dashboard/MonitoringPelajar.vue"
            ),
        },
        {
          path: "/guru-staff",
          name: "GuruStaff",
          meta: {
            title: "Guru & Staff",
          },
          component: () =>
            import(
              /* webpackChunkName: "guru_sekolah" */ "./views/School/Dashboard/MonitoringGuruStaff.vue"
            ),
        },
        {
          path: "/materi",
          name: "Materi",
          meta: {
            title: "Materi",
          },
          component: () =>
            import(
              /* webpackChunkName: "materi_sekolah" */ "./views/School/Dashboard/MonitoringMateri.vue"
            ),
        },
        {
          path: "/tugas",
          name: "Tugas",
          meta: {
            title: "Tugas",
          },
          component: () =>
            import(
              /* webpackChunkName: "tugas_sekolah" */ "./views/School/Dashboard/MonitoringTugas.vue"
            ),
        },
        {
          path: "/ujian",
          name: "Ujian",
          meta: {
            title: "Ujian",
          },
          component: () =>
            import(
              /* webpackChunkName: "ujian_sekolah" */ "./views/School/Dashboard/MonitoringUjian.vue"
            ),
        },
        {
          path: "/mata-pelajaran",
          name: "Mata Pelajaran",
          meta: {
            title: "MataPelajaran",
          },
          component: () =>
            import(
              /* webpackChunkName: "mapel_sekolah" */ "./views/School/Dashboard/MonitoringMapel.vue"
            ),
        },
        {
          path: "/dashboard-feed-active",
          name: "PostingTeraktif",
          meta: {
            title: "Posting Teraktif",
          },
          component: () =>
            import(
              /* webpackChunkName: "posting_teraktif" */ "./views/School/Dashboard/DashboardFeedActive.vue"
            ),
        },
        {
          path: "/dashboard-feed-hastag",
          name: "HastagTerpopuler",
          meta: {
            title: "Hastag Terpopuler",
          },
          component: () =>
            import(
              /* webpackChunkName: "hastag_populer" */ "./views/School/Dashboard/DashboardFeedHastag.vue"
            ),
        },
        {
          path: "/dashboard-feed-posting-percentage",
          name: "PersentasePostingTeraktif",
          meta: {
            title: "Persentase Posting Teraktif",
          },
          component: () =>
            import(
              /* webpackChunkName: "presentase_posting_teraktif" */ "./views/School/Dashboard/DashboardFeedPercentageHastag.vue"
            ),
        },
        {
          path: "/dashboard-assignment-total",
          name: "TotalTugas",
          meta: {
            title: "Total Tugas",
          },
          component: () =>
            import(
              /* webpackChunkName: "total_tugas" */ "./views/School/Dashboard/DashboardAssignmentTotal.vue"
            ),
        },
        {
          path: "/dashboard-assignment-popular",
          name: "MapelTerpopluer",
          meta: {
            title: "Mapel Terpopluer",
          },
          component: () =>
            import(
              /* webpackChunkName: "mapel_terpopuler" */ "./views/School/Dashboard/DashboardAssignmentPopular.vue"
            ),
        },
        {
          path: "/dashboard-assignment-percentage",
          name: "PersentaseTugas",
          meta: {
            title: "Persentase Tugas",
          },
          component: () =>
            import(
              /* webpackChunkName: "presentase_tugas" */ "./views/School/Dashboard/DashboardAssignmentPercentage.vue"
            ),
        },
      ],
    },
  ],
});
