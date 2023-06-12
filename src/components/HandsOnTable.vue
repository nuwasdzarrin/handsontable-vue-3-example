<template>
  <div>
    <div class="text-center mb-3">
      <h4><b>{{title}}</b></h4>
    </div>
    <HotTable ref="hotComponent" :settings="handsOnTableSetting" ></HotTable>
    <div class="my-4"></div>
    <div class="d-flex align-items-center justify-content-between">
      <div>
        <div class="d-flex" v-if="!originData.length">
          <input type="number" class="form-control mr-3" v-model="bulkRowValue" />
          <button class="btn btn-outline-info" @click="onBulkAddRow">Add row</button>
        </div>
      </div>
      <button class="btn btn-success">{{ props.originData.length ? 'Update' : 'Save' }}</button>
    </div>
  </div>
</template>

<script>
localStorage.setItem('afterSave', '')
window.addEventListener('beforeunload', function (e) {
  if (localStorage.getItem('afterSave')) return;
  e.preventDefault();
  e.returnValue = '';
})
</script>
<script setup>
import 'handsontable/dist/handsontable.full.css';
import {ref} from 'vue';
import {HotTable} from '@handsontable/vue3';
import {registerAllModules} from 'handsontable/registry';
registerAllModules();

const props = defineProps({
  title: String,
  agentSelected: {
    type: Object,
    default() {
      return {}
    }
  },
  originData: {
    type: Array,
    default() {
      return []
    }
  }
})

const districts = [{"district":"Toba Samosir","province":"SUMATERA UTARA"},{"district":"Tebing Tinggi","province":"SUMATERA UTARA"},{"district":"Tapanuli Utara","province":"SUMATERA UTARA"},{"district":"Tapanuli Tengah","province":"SUMATERA UTARA"},{"district":"Tapanuli Selatan","province":"SUMATERA UTARA"},{"district":"Simalungun","province":"SUMATERA UTARA"},{"district":"Serdang Bedagai","province":"SUMATERA UTARA"},{"district":"Samosir","province":"SUMATERA UTARA"},{"district":"Pakpak Bharat","province":"SUMATERA UTARA"},{"district":"Padang Lawas Utara","province":"SUMATERA UTARA"},{"district":"Padang Lawas","province":"SUMATERA UTARA"},{"district":"Nias Selatan","province":"SUMATERA UTARA"},{"district":"Nias","province":"SUMATERA UTARA"},{"district":"Mandailing Natal","province":"SUMATERA UTARA"},{"district":"Langkat","province":"SUMATERA UTARA"},{"district":"Labuhanbatu","province":"SUMATERA UTARA"},{"district":"Kota Tebing Tinggi","province":"SUMATERA UTARA"},{"district":"Kota Tanjung Balai","province":"SUMATERA UTARA"},{"district":"Kota Sibolga","province":"SUMATERA UTARA"},{"district":"Kota Pematangsiantar","province":"SUMATERA UTARA"},{"district":"Kota Padang Sidempuan","province":"SUMATERA UTARA"},{"district":"Kota Medan","province":"SUMATERA UTARA"},{"district":"Kota Binjai","province":"SUMATERA UTARA"},{"district":"Karo","province":"SUMATERA UTARA"},{"district":"Humbang Hasudutan","province":"SUMATERA UTARA"},{"district":"Deli Serdang","province":"SUMATERA UTARA"},{"district":"Dairi","province":"SUMATERA UTARA"},{"district":"Batu bara","province":"SUMATERA UTARA"},{"district":"Asahan","province":"SUMATERA UTARA"},{"district":"Ogan Komering Ulu Timur","province":"SUMATERA SELATAN"},{"district":"Ogan Komering Ulu Selatan","province":"SUMATERA SELATAN"},{"district":"Ogan Komering Ulu","province":"SUMATERA SELATAN"},{"district":"Ogan Komering Ilir","province":"SUMATERA SELATAN"},{"district":"Ogan Ilir","province":"SUMATERA SELATAN"},{"district":"Musi Rawas","province":"SUMATERA SELATAN"},{"district":"Musi Banyuasin","province":"SUMATERA SELATAN"},{"district":"Muara Enim","province":"SUMATERA SELATAN"},{"district":"Lubuk Linggau","province":"SUMATERA SELATAN"},{"district":"Lahat","province":"SUMATERA SELATAN"},{"district":"Kota Prabumulih","province":"SUMATERA SELATAN"},{"district":"Kota Palembang","province":"SUMATERA SELATAN"},{"district":"Kota Pagar Alam","province":"SUMATERA SELATAN"},{"district":"Empat Lawang","province":"SUMATERA SELATAN"},{"district":"Banyuasin","province":"SUMATERA SELATAN"},{"district":"Tanah Datar","province":"SUMATERA BARAT"},{"district":"Solok Selatan","province":"SUMATERA BARAT"},{"district":"Solok","province":"SUMATERA BARAT"},{"district":"Sijunjung","province":"SUMATERA BARAT"},{"district":"Pesisir Selatan","province":"SUMATERA BARAT"},{"district":"Pasaman Barat","province":"SUMATERA BARAT"},{"district":"Pasaman","province":"SUMATERA BARAT"},{"district":"Padang Pariaman","province":"SUMATERA BARAT"},{"district":"Lima Puluh Kota","province":"SUMATERA BARAT"},{"district":"Kota Solok","province":"SUMATERA BARAT"},{"district":"Kota Sawahlunto","province":"SUMATERA BARAT"},{"district":"Kota Payakumbuh","province":"SUMATERA BARAT"},{"district":"Kota Pariaman","province":"SUMATERA BARAT"},{"district":"Kota Padang Panjang","province":"SUMATERA BARAT"},{"district":"Kota Padang","province":"SUMATERA BARAT"},{"district":"Kota Bukit Tinggi","province":"SUMATERA BARAT"},{"district":"Kepulauan Mentawai","province":"SUMATERA BARAT"},{"district":"Dharmasraya","province":"SUMATERA BARAT"},{"district":"Agam","province":"SUMATERA BARAT"},{"district":"Minahasa Utara","province":"SULAWESI UTARA"},{"district":"Minahasa Tenggara","province":"SULAWESI UTARA"},{"district":"Minahasa Selatan","province":"SULAWESI UTARA"},{"district":"Minahasa","province":"SULAWESI UTARA"},{"district":"Kota Tomohon","province":"SULAWESI UTARA"},{"district":"Kota Manado","province":"SULAWESI UTARA"},{"district":"Kota Bitung","province":"SULAWESI UTARA"},{"district":"Kepulauan Talaud","province":"SULAWESI UTARA"},{"district":"Kepulauan Sangihe","province":"SULAWESI UTARA"},{"district":"Bolaang Mongondow Utara","province":"SULAWESI UTARA"},{"district":"Bolaang Mongondow","province":"SULAWESI UTARA"},{"district":"Wakatobi","province":"SULAWESI TENGGARA"},{"district":"Muna Barat","province":"SULAWESI TENGGARA"},{"district":"Muna","province":"SULAWESI TENGGARA"},{"district":"Kota Kendari","province":"SULAWESI TENGGARA"},{"district":"Kota Bau-Bau","province":"SULAWESI TENGGARA"},{"district":"Konawe Utara/ Selatan","province":"SULAWESI TENGGARA"},{"district":"Konawe","province":"SULAWESI TENGGARA"},{"district":"Kolaka Utara","province":"SULAWESI TENGGARA"},{"district":"Kolaka","province":"SULAWESI TENGGARA"},{"district":"Buton","province":"SULAWESI TENGGARA"},{"district":"Bombana","province":"SULAWESI TENGGARA"},{"district":"Toli-Toli","province":"SULAWESI TENGAH"},{"district":"Tojo Una-Una","province":"SULAWESI TENGAH"},{"district":"Poso","province":"SULAWESI TENGAH"},{"district":"Parigi Moutong","province":"SULAWESI TENGAH"},{"district":"Morowali","province":"SULAWESI TENGAH"},{"district":"Kota Palu","province":"SULAWESI TENGAH"},{"district":"Donggala","province":"SULAWESI TENGAH"},{"district":"Buol","province":"SULAWESI TENGAH"},{"district":"Banggai Kepulauan","province":"SULAWESI TENGAH"},{"district":"Banggai","province":"SULAWESI TENGAH"},{"district":"Wajo","province":"SULAWESI SELATAN"},{"district":"Toraja Utara","province":"SULAWESI SELATAN"},{"district":"Tana Toraja","province":"SULAWESI SELATAN"},{"district":"Takalar","province":"SULAWESI SELATAN"},{"district":"Soppeng","province":"SULAWESI SELATAN"},{"district":"Sinjai","province":"SULAWESI SELATAN"},{"district":"Sindenreng Rappang","province":"SULAWESI SELATAN"},{"district":"Pinrang","province":"SULAWESI SELATAN"},{"district":"Pangkajene Kepulauan","province":"SULAWESI SELATAN"},{"district":"Ogan Ilir","province":"SULAWESI SELATAN"},{"district":"Maros","province":"SULAWESI SELATAN"},{"district":"Luwu Utara","province":"SULAWESI SELATAN"},{"district":"Luwu Timur","province":"SULAWESI SELATAN"},{"district":"Kota Pare-Pare","province":"SULAWESI SELATAN"},{"district":"Kota Palopo","province":"SULAWESI SELATAN"},{"district":"Kota Makassar","province":"SULAWESI SELATAN"},{"district":"Kepulauan Selayar","province":"SULAWESI SELATAN"},{"district":"Jeneponto","province":"SULAWESI SELATAN"},{"district":"Gowa","province":"SULAWESI SELATAN"},{"district":"Enrekang","province":"SULAWESI SELATAN"},{"district":"Bulukumba","province":"SULAWESI SELATAN"},{"district":"Bone","province":"SULAWESI SELATAN"},{"district":"Barru","province":"SULAWESI SELATAN"},{"district":"Bantaeng","province":"SULAWESI SELATAN"},{"district":"Polewali Mandar","province":"SULAWESI BARAT"},{"district":"Mamuju Utara","province":"SULAWESI BARAT"},{"district":"Mamuju","province":"SULAWESI BARAT"},{"district":"Mamasa","province":"SULAWESI BARAT"},{"district":"Majene","province":"SULAWESI BARAT"},{"district":"Siak","province":"RIAU"},{"district":"Rokan Hulu","province":"RIAU"},{"district":"Rokan Hilir","province":"RIAU"},{"district":"Pelalawan","province":"RIAU"},{"district":"Meranti","province":"RIAU"},{"district":"Kuantan Singingi","province":"RIAU"},{"district":"Kota Pekanbaru","province":"RIAU"},{"district":"Kota Dumai","province":"RIAU"},{"district":"Kampar","province":"RIAU"},{"district":"Indragiri Hulu","province":"RIAU"},{"district":"Indragiri Hilir","province":"RIAU"},{"district":"Bengkalis","province":"RIAU"},{"district":"Teluk Wondama","province":"PAPUA BARAT"},{"district":"Teluk Bintuni","province":"PAPUA BARAT"},{"district":"Sorong Selatan","province":"PAPUA BARAT"},{"district":"Sorong","province":"PAPUA BARAT"},{"district":"Raja Ampat","province":"PAPUA BARAT"},{"district":"Kota Sorong","province":"PAPUA BARAT"},{"district":"Kaimana","province":"PAPUA BARAT"},{"district":"Fakfak","province":"PAPUA BARAT"},{"district":"Yapen Waropen","province":"PAPUA"},{"district":"Yahukimo","province":"PAPUA"},{"district":"Waropen","province":"PAPUA"},{"district":"Tolikara","province":"PAPUA"},{"district":"Supiori","province":"PAPUA"},{"district":"Sarmi","province":"PAPUA"},{"district":"Puncak Jaya","province":"PAPUA"},{"district":"Pegunungan Bintang","province":"PAPUA"},{"district":"Paniai","province":"PAPUA"},{"district":"Nabire","province":"PAPUA"},{"district":"Mimika","province":"PAPUA"},{"district":"Merauke","province":"PAPUA"},{"district":"Mappi","province":"PAPUA"},{"district":"Manokwari","province":"PAPUA"},{"district":"Mamberamo Raya","province":"PAPUA"},{"district":"Kota Jayapura","province":"PAPUA"},{"district":"Keerom","province":"PAPUA"},{"district":"Jayawijaya","province":"PAPUA"},{"district":"Jayapura","province":"PAPUA"},{"district":"Intan Jaya","province":"PAPUA"},{"district":"Dogiyai","province":"PAPUA"},{"district":"Deiyai","province":"PAPUA"},{"district":"Boven Digoel","province":"PAPUA"},{"district":"Biak Numfor","province":"PAPUA"},{"district":"Asmat","province":"PAPUA"},{"district":"Timor Tengah Utara","province":"NTT"},{"district":"Timor Tengah Selatan","province":"NTT"},{"district":"Sumba Timur","province":"NTT"},{"district":"Sumba Tengah","province":"NTT"},{"district":"Sumba Barat Daya","province":"NTT"},{"district":"Sumba Barat","province":"NTT"},{"district":"Sikka","province":"NTT"},{"district":"Rote Ndao","province":"NTT"},{"district":"Ngada","province":"NTT"},{"district":"Nagekeo","province":"NTT"},{"district":"Manggarai Timur","province":"NTT"},{"district":"Manggarai Barat","province":"NTT"},{"district":"Manggarai","province":"NTT"},{"district":"Lembata","province":"NTT"},{"district":"Kupang","province":"NTT"},{"district":"Kota Kupang","province":"NTT"},{"district":"Flores Timur","province":"NTT"},{"district":"Ende","province":"NTT"},{"district":"Belu","province":"NTT"},{"district":"Alor","province":"NTT"},{"district":"Sumbawa Barat","province":"NTB"},{"district":"Sumbawa","province":"NTB"},{"district":"Lombok Utara ","province":"NTB"},{"district":"Lombok Timur","province":"NTB"},{"district":"Lombok Tengah","province":"NTB"},{"district":"Lombok Barat","province":"NTB"},{"district":"Kota Mataram","province":"NTB"},{"district":"Kota Bima","province":"NTB"},{"district":"Dompu","province":"NTB"},{"district":"Bima","province":"NTB"},{"district":"Simeulue","province":"NAD"},{"district":"Pidie Jaya","province":"NAD"},{"district":"Pidie","province":"NAD"},{"district":"Nagan Raya","province":"NAD"},{"district":"Kota Subulussalam","province":"NAD"},{"district":"Kota Sabang","province":"NAD"},{"district":"Kota Lhokseumawe","province":"NAD"},{"district":"Kota Langsa","province":"NAD"},{"district":"Kota Banda Aceh","province":"NAD"},{"district":"Gayo Lues","province":"NAD"},{"district":"Bireuen","province":"NAD"},{"district":"Bener Meriah","province":"NAD"},{"district":"Aceh Utara","province":"NAD"},{"district":"Aceh Timur","province":"NAD"},{"district":"Aceh Tenggara","province":"NAD"},{"district":"Aceh Tengah","province":"NAD"},{"district":"Aceh Tamiang","province":"NAD"},{"district":"Aceh Singkil","province":"NAD"},{"district":"Aceh Selatan","province":"NAD"},{"district":"Aceh Jaya","province":"NAD"},{"district":"Aceh Besar","province":"NAD"},{"district":"Aceh Barat Daya","province":"NAD"},{"district":"Aceh Barat","province":"NAD"},{"district":"Kota Tidore","province":"MALUKU UTARA"},{"district":"Kota Ternate","province":"MALUKU UTARA"},{"district":"Kepulauan Sula","province":"MALUKU UTARA"},{"district":"Halmahera Utara","province":"MALUKU UTARA"},{"district":"Halmahera Timur","province":"MALUKU UTARA"},{"district":"Halmahera Tengah","province":"MALUKU UTARA"},{"district":"Halmahera Selatan","province":"MALUKU UTARA"},{"district":"Halmahera Barat","province":"MALUKU UTARA"},{"district":"Seram Bagian Timur","province":"MALUKU"},{"district":"Seram Bagian Barat","province":"MALUKU"},{"district":"Maluku Tenggara Barat","province":"MALUKU"},{"district":"Maluku Tenggara","province":"MALUKU"},{"district":"Maluku Tengah","province":"MALUKU"},{"district":"Maluku","province":"MALUKU"},{"district":"Kota Ambon","province":"MALUKU"},{"district":"Kepulauan Aru","province":"MALUKU"},{"district":"Buru","province":"MALUKU"},{"district":"Way Kanan","province":"LAMPUNG"},{"district":"Tulang Bawang","province":"LAMPUNG"},{"district":"Tanggamus","province":"LAMPUNG"},{"district":"Pesawaran","province":"LAMPUNG"},{"district":"Lampung Utara","province":"LAMPUNG"},{"district":"Lampung Timur","province":"LAMPUNG"},{"district":"Lampung Tengah","province":"LAMPUNG"},{"district":"Lampung Selatan","province":"LAMPUNG"},{"district":"Lampung Barat","province":"LAMPUNG"},{"district":"Kota Metro","province":"LAMPUNG"},{"district":"Bandar Lampung","province":"LAMPUNG"},{"district":"Natuna","province":"KEPULAUAN RIAU"},{"district":"Lingga","province":"KEPULAUAN RIAU"},{"district":"Kota Tanjung Pinang","province":"KEPULAUAN RIAU"},{"district":"Kota Batam","province":"KEPULAUAN RIAU"},{"district":"Karimun","province":"KEPULAUAN RIAU"},{"district":"Bintan","province":"KEPULAUAN RIAU"},{"district":"Tana Tidung","province":"KALIMANTAN UTARA"},{"district":"Nunukan","province":"KALIMANTAN UTARA"},{"district":"Malinau","province":"KALIMANTAN UTARA"},{"district":"Kota Tarakan","province":"KALIMANTAN UTARA"},{"district":"Bulungan","province":"KALIMANTAN UTARA"},{"district":"Penajam Paser Utara","province":"KALIMANTAN TIMUR"},{"district":"Paser","province":"KALIMANTAN TIMUR"},{"district":"Kutai Timur","province":"KALIMANTAN TIMUR"},{"district":"Kutai Kartanegara","province":"KALIMANTAN TIMUR"},{"district":"Kutai Barat","province":"KALIMANTAN TIMUR"},{"district":"Kota Samarinda","province":"KALIMANTAN TIMUR"},{"district":"Kota Bontang","province":"KALIMANTAN TIMUR"},{"district":"Kota Balikpapan","province":"KALIMANTAN TIMUR"},{"district":"Berau","province":"KALIMANTAN TIMUR"},{"district":"Sukamara","province":"KALIMANTAN TENGAH"},{"district":"Seruyan","province":"KALIMANTAN TENGAH"},{"district":"Pulang Pisau","province":"KALIMANTAN TENGAH"},{"district":"Lamandau","province":"KALIMANTAN TENGAH"},{"district":"Kotawaringin Timur","province":"KALIMANTAN TENGAH"},{"district":"Kotawaringin Barat","province":"KALIMANTAN TENGAH"},{"district":"Kota Palangkaraya","province":"KALIMANTAN TENGAH"},{"district":"Katingan","province":"KALIMANTAN TENGAH"},{"district":"Kapuas","province":"KALIMANTAN TENGAH"},{"district":"Gunung Mas","province":"KALIMANTAN TENGAH"},{"district":"Tapin","province":"KALIMANTAN SELATAN"},{"district":"Tanah Laut","province":"KALIMANTAN SELATAN"},{"district":"Tanah Bumbu","province":"KALIMANTAN SELATAN"},{"district":"Tabalong","province":"KALIMANTAN SELATAN"},{"district":"Murung Raya","province":"KALIMANTAN SELATAN"},{"district":"Kotabaru","province":"KALIMANTAN SELATAN"},{"district":"Kota Banjarmasin","province":"KALIMANTAN SELATAN"},{"district":"Kota Banjarbaru","province":"KALIMANTAN SELATAN"},{"district":"Hulu Sungai Utara","province":"KALIMANTAN SELATAN"},{"district":"Hulu Sungai Tengah","province":"KALIMANTAN SELATAN"},{"district":"Hulu Sungai Selatan","province":"KALIMANTAN SELATAN"},{"district":"Barito Utara","province":"KALIMANTAN SELATAN"},{"district":"Barito Timur","province":"KALIMANTAN SELATAN"},{"district":"Barito Selatan","province":"KALIMANTAN SELATAN"},{"district":"Barito Kuala","province":"KALIMANTAN SELATAN"},{"district":"Banjar","province":"KALIMANTAN SELATAN"},{"district":"Balangan","province":"KALIMANTAN SELATAN"},{"district":"Sintang","province":"KALIMANTAN BARAT"},{"district":"Sekadau","province":"KALIMANTAN BARAT"},{"district":"Sanggau","province":"KALIMANTAN BARAT"},{"district":"Sambas","province":"KALIMANTAN BARAT"},{"district":"Pontianak","province":"KALIMANTAN BARAT"},{"district":"Melawi","province":"KALIMANTAN BARAT"},{"district":"Landak","province":"KALIMANTAN BARAT"},{"district":"Kubu Raya","province":"KALIMANTAN BARAT"},{"district":"Kota Singkawang","province":"KALIMANTAN BARAT"},{"district":"Kota Pontianak","province":"KALIMANTAN BARAT"},{"district":"Ketapang","province":"KALIMANTAN BARAT"},{"district":"Kayong Utara","province":"KALIMANTAN BARAT"},{"district":"Kapuas Hulu","province":"KALIMANTAN BARAT"},{"district":"Bengkayang","province":"KALIMANTAN BARAT"},{"district":"Ambalau ","province":"KALIMANTAN BARAT"},{"district":"Tulungagung","province":"JAWA TIMUR"},{"district":"Tuban","province":"JAWA TIMUR"},{"district":"Trenggalek","province":"JAWA TIMUR"},{"district":"Sumenep","province":"JAWA TIMUR"},{"district":"Sidoarjo","province":"JAWA TIMUR"},{"district":"Sampang","province":"JAWA TIMUR"},{"district":"Probolinggo","province":"JAWA TIMUR"},{"district":"Ponorogo","province":"JAWA TIMUR"},{"district":"Pasuruan","province":"JAWA TIMUR"},{"district":"Pamekasan","province":"JAWA TIMUR"},{"district":"Pacitan","province":"JAWA TIMUR"},{"district":"Ngawi","province":"JAWA TIMUR"},{"district":"Nganjuk","province":"JAWA TIMUR"},{"district":"Mojokerto","province":"JAWA TIMUR"},{"district":"Malang","province":"JAWA TIMUR"},{"district":"Magetan","province":"JAWA TIMUR"},{"district":"Madiun","province":"JAWA TIMUR"},{"district":"Lumajang","province":"JAWA TIMUR"},{"district":"Lamongan","province":"JAWA TIMUR"},{"district":"Kota Surabaya","province":"JAWA TIMUR"},{"district":"Kota Probolinggo","province":"JAWA TIMUR"},{"district":"Kota Pasuruan","province":"JAWA TIMUR"},{"district":"Kota Mojokerto","province":"JAWA TIMUR"},{"district":"Kota Malang","province":"JAWA TIMUR"},{"district":"Kota Madiun","province":"JAWA TIMUR"},{"district":"Kota Kediri","province":"JAWA TIMUR"},{"district":"Kota Blitar","province":"JAWA TIMUR"},{"district":"Kota Batu","province":"JAWA TIMUR"},{"district":"Kediri","province":"JAWA TIMUR"},{"district":"Kab Situbondo","province":"JAWA TIMUR"},{"district":"Jombang","province":"JAWA TIMUR"},{"district":"Jember","province":"JAWA TIMUR"},{"district":"Gresik","province":"JAWA TIMUR"},{"district":"Bondowoso","province":"JAWA TIMUR"},{"district":"Bojonegoro","province":"JAWA TIMUR"},{"district":"Blitar","province":"JAWA TIMUR"},{"district":"Banyuwangi","province":"JAWA TIMUR"},{"district":"Bangkalan","province":"JAWA TIMUR"},{"district":"Wonosobo","province":"JAWA TENGAH"},{"district":"Wonogiri","province":"JAWA TENGAH"},{"district":"Temanggung","province":"JAWA TENGAH"},{"district":"Tegal","province":"JAWA TENGAH"},{"district":"Sukoharjo","province":"JAWA TENGAH"},{"district":"Sragen","province":"JAWA TENGAH"},{"district":"Semarang","province":"JAWA TENGAH"},{"district":"Rembang","province":"JAWA TENGAH"},{"district":"Purworejo","province":"JAWA TENGAH"},{"district":"Purbalingga","province":"JAWA TENGAH"},{"district":"Pemalang","province":"JAWA TENGAH"},{"district":"Pekalongan","province":"JAWA TENGAH"},{"district":"Pati","province":"JAWA TENGAH"},{"district":"Magelang","province":"JAWA TENGAH"},{"district":"Kudus","province":"JAWA TENGAH"},{"district":"Kota Tegal","province":"JAWA TENGAH"},{"district":"Kota Surakarta","province":"JAWA TENGAH"},{"district":"Kota Semarang","province":"JAWA TENGAH"},{"district":"Kota Salatiga","province":"JAWA TENGAH"},{"district":"Kota Pekalongan","province":"JAWA TENGAH"},{"district":"Kota Magelang","province":"JAWA TENGAH"},{"district":"Klaten","province":"JAWA TENGAH"},{"district":"Kendal","province":"JAWA TENGAH"},{"district":"Kebumen","province":"JAWA TENGAH"},{"district":"Karanganyar","province":"JAWA TENGAH"},{"district":"Jepara","province":"JAWA TENGAH"},{"district":"Grobogan","province":"JAWA TENGAH"},{"district":"Demak","province":"JAWA TENGAH"},{"district":"Cilacap","province":"JAWA TENGAH"},{"district":"Brebes","province":"JAWA TENGAH"},{"district":"Boyolali","province":"JAWA TENGAH"},{"district":"Blora","province":"JAWA TENGAH"},{"district":"Batang","province":"JAWA TENGAH"},{"district":"Banyumas","province":"JAWA TENGAH"},{"district":"Banjarnegara","province":"JAWA TENGAH"},{"district":"Tasikmalaya","province":"JAWA BARAT"},{"district":"Sumedang","province":"JAWA BARAT"},{"district":"Sukabumi","province":"JAWA BARAT"},{"district":"Subang","province":"JAWA BARAT"},{"district":"Purwakarta","province":"JAWA BARAT"},{"district":"Pangandaran","province":"JAWA BARAT"},{"district":"Majalengka","province":"JAWA BARAT"},{"district":"Kuningan","province":"JAWA BARAT"},{"district":"Kota Tasikmalaya","province":"JAWA BARAT"},{"district":"Kota Sukabumi","province":"JAWA BARAT"},{"district":"Kota Depok","province":"JAWA BARAT"},{"district":"Kota Cirebon","province":"JAWA BARAT"},{"district":"Kota Cimahi","province":"JAWA BARAT"},{"district":"Kota Bekasi","province":"JAWA BARAT"},{"district":"Kota Banjar","province":"JAWA BARAT"},{"district":"Kota Bandung","province":"JAWA BARAT"},{"district":"Karawang","province":"JAWA BARAT"},{"district":"Indramayu","province":"JAWA BARAT"},{"district":"Garut","province":"JAWA BARAT"},{"district":"Cirebon","province":"JAWA BARAT"},{"district":"Cianjur","province":"JAWA BARAT"},{"district":"Ciamis","province":"JAWA BARAT"},{"district":"Bogor","province":"JAWA BARAT"},{"district":"Bekasi","province":"JAWA BARAT"},{"district":"Bandung Barat","province":"JAWA BARAT"},{"district":"Bandung","province":"JAWA BARAT"},{"district":"Tebo","province":"JAMBI"},{"district":"Tanjung Jabung Timur","province":"JAMBI"},{"district":"Tanjung Jabung Barat","province":"JAMBI"},{"district":"Sarolangun","province":"JAMBI"},{"district":"Muaro Jambi","province":"JAMBI"},{"district":"Merangin","province":"JAMBI"},{"district":"Kota Jambi","province":"JAMBI"},{"district":"Kerinci","province":"JAMBI"},{"district":"Bungo","province":"JAMBI"},{"district":"Batang Hari","province":"JAMBI"},{"district":"Pahuwato","province":"GORONTALO"},{"district":"Kota Gorontalo","province":"GORONTALO"},{"district":"Gorontalo Utara","province":"GORONTALO"},{"district":"Gorontalo","province":"GORONTALO"},{"district":"Bone Bolango","province":"GORONTALO"},{"district":"Boalemo","province":"GORONTALO"},{"district":"Kepulauan Seribu","province":"DKI JAKARTA"},{"district":"Jakarta Utara","province":"DKI JAKARTA"},{"district":"Jakarta Timur","province":"DKI JAKARTA"},{"district":"Jakarta Selatan","province":"DKI JAKARTA"},{"district":"Jakarta Pusat","province":"DKI JAKARTA"},{"district":"Jakarta Barat","province":"DKI JAKARTA"},{"district":"Sleman","province":"D.I. YOGYAKARTA"},{"district":"Kulon Progo","province":"D.I. YOGYAKARTA"},{"district":"Kota Yogyakarta","province":"D.I. YOGYAKARTA"},{"district":"Gunung Kidul","province":"D.I. YOGYAKARTA"},{"district":"Bantul","province":"D.I. YOGYAKARTA"},{"district":"Seluma","province":"BENGKULU"},{"district":"Rejang Lebong","province":"BENGKULU"},{"district":"Muko-Muko","province":"BENGKULU"},{"district":"Lebong","province":"BENGKULU"},{"district":"Kota Bengkulu","province":"BENGKULU"},{"district":"Kepahiang","province":"BENGKULU"},{"district":"Kaur","province":"BENGKULU"},{"district":"Bengkulu Utara","province":"BENGKULU"},{"district":"Bengkulu Selatan","province":"BENGKULU"},{"district":"Tangerang Selatan","province":"BANTEN"},{"district":"Tangerang","province":"BANTEN"},{"district":"Serang","province":"BANTEN"},{"district":"Pandeglang","province":"BANTEN"},{"district":"Lebak","province":"BANTEN"},{"district":"Kota Tangerang","province":"BANTEN"},{"district":"Kota Serang","province":"BANTEN"},{"district":"Kota Cilegon","province":"BANTEN"},{"district":"Kota Pangkal Pinang","province":"BANGKA BELITUNG"},{"district":"Belitung Timur","province":"BANGKA BELITUNG"},{"district":"Belitung","province":"BANGKA BELITUNG"},{"district":"Bangka Tengah","province":"BANGKA BELITUNG"},{"district":"Bangka Selatan","province":"BANGKA BELITUNG"},{"district":"Bangka Barat","province":"BANGKA BELITUNG"},{"district":"Bangka","province":"BANGKA BELITUNG"},{"district":"Tabanan","province":"BALI"},{"district":"Kota Denpasar","province":"BALI"},{"district":"Klungkung","province":"BALI"},{"district":"Karangasem","province":"BALI"},{"district":"Jembrana","province":"BALI"},{"district":"Gianyar","province":"BALI"},{"district":"Buleleng","province":"BALI"},{"district":"Bangli","province":"BALI"},{"district":"Badung","province":"BALI"},{"district":"Amlapura","province":"BALI"}]
const categories_flat = [{"pk":1042,"name":"Handphone Rakitan ( lcd, mainboard, casing )","full_name":"Electronic > Handphone & Komputer > Handphone Rakitan ( lcd, mainboard, casing )","slug":"handphone-rakitan-lcd-mainboard-casing-1042"},{"pk":1043,"name":"Computer and Laptop","full_name":"Electronic > Handphone & Komputer > Computer and Laptop","slug":"computer-and-laptop-1043"},{"pk":1044,"name":"Computer and Laptop Accessories","full_name":"Electronic > Handphone & Komputer > Computer and Laptop Accessories","slug":"computer-and-laptop-accessories-1044"},{"pk":1045,"name":"Handphone Accessories","full_name":"Electronic > Handphone & Komputer > Handphone Accessories","slug":"handphone-accessories-1045"},{"pk":1046,"name":"Handphone rakitan include battery ","full_name":"Electronic > Handphone & Komputer > Handphone rakitan include battery ","slug":"handphone-rakitan-include-battery-1046"},{"pk":1049,"name":"Music and Film","full_name":"Hobi > Indoor > Music and Film","slug":"music-and-film-1049"},{"pk":1050,"name":"Gaming","full_name":"Hobi > Indoor > Gaming","slug":"gaming-1050"},{"pk":1051,"name":"Hobbies and Collections","full_name":"Hobi > Indoor > Hobbies and Collections","slug":"hobbies-and-collections-1051"},{"pk":1052,"name":"Comic","full_name":"Hobi > Indoor > Comic","slug":"comic-1052"},{"pk":1053,"name":"Embroidery","full_name":"Hobi > Indoor > Embroidery","slug":"embroidery-1053"},{"pk":1055,"name":"Photography","full_name":"Hobi > Outdoor > Photography","slug":"photography-1055"},{"pk":1056,"name":"Sports and Outdoors","full_name":"Hobi > Outdoor > Sports and Outdoors","slug":"sports-and-outdoors-1056"},{"pk":1057,"name":"Automotive","full_name":"Hobi > Outdoor > Automotive","slug":"automotive-1057"},{"pk":1058,"name":"Carpentry","full_name":"Hobi > Outdoor > Carpentry","slug":"carpentry-1058"},{"pk":1061,"name":"Baju","full_name":"Fashion > Pakaian > Baju","slug":"baju-1061"},{"pk":1062,"name":"Shoes and Sandals","full_name":"Fashion > Pakaian > Shoes and Sandals","slug":"shoes-and-sandals-1062"},{"pk":1063,"name":"Bag","full_name":"Fashion > Pakaian > Bag","slug":"bag-1063"},{"pk":1065,"name":"Watches","full_name":"Fashion > Aksesoris > Watches","slug":"watches-1065"},{"pk":1066,"name":"Smart Watch (brand)","full_name":"Fashion > Aksesoris > Smart Watch (brand)","slug":"smart-watch-brand-1066"},{"pk":1067,"name":"Fashion Accessories","full_name":"Fashion > Aksesoris > Fashion Accessories","slug":"fashion-accessories-1067"},{"pk":1068,"name":"Watches (Max. 50 RMB/item)","full_name":"Fashion > Aksesoris > Watches (Max. 50 RMB/item)","slug":"watches-max-50-rmbitem-1068"},{"pk":1071,"name":"Textbook / Educational Book","full_name":"Kantor > Percetakan > Textbook / Educational Book","slug":"textbook-educational-book-1071"},{"pk":1073,"name":"Stationery and Office","full_name":"Kantor > ATK > Stationery and Office","slug":"stationery-and-office-1073"},{"pk":1074,"name":"Book","full_name":"Kantor > ATK > Book","slug":"book-1074"},{"pk":1077,"name":"Household Tools","full_name":"Rumah Tangga > Dapur > Household Tools","slug":"household-tools-1077"},{"pk":1078,"name":"Food and Drink","full_name":"Rumah Tangga > Dapur > Food and Drink","slug":"food-and-drink-1078"},{"pk":1080,"name":"Perlengkapan Ibu dan Anak","full_name":"Rumah Tangga > Ibu dan Anak > Perlengkapan Ibu dan Anak","slug":"perlengkapan-ibu-dan-anak-1080"},{"pk":1081,"name":"Toys","full_name":"Rumah Tangga > Ibu dan Anak > Toys","slug":"toys-1081"},{"pk":1084,"name":"Health and Nutrition","full_name":"Kesehatan > Makanan > Health and Nutrition","slug":"health-and-nutrition-1084"},{"pk":1085,"name":"Medicines","full_name":"Kesehatan > Makanan > Medicines","slug":"medicines-1085"},{"pk":1087,"name":"Medical Equipment","full_name":"Kesehatan > Alat Kesehatan > Medical Equipment","slug":"medical-equipment-1087"},{"pk":1090,"name":"Souvenir","full_name":"Lainnya > Lainnya > Souvenir","slug":"souvenir-1090"},{"pk":1091,"name":"Lighting Fixture","full_name":"Lainnya > Lainnya > Lighting Fixture","slug":"lighting-fixture-1091"},{"pk":1092,"name":"Converter, Controller","full_name":"Lainnya > Lainnya > Converter, Controller","slug":"converter-controller-1092"},{"pk":1093,"name":"Remote TV","full_name":"Lainnya > Lainnya > Remote TV","slug":"remote-tv-1093"},{"pk":1399,"name":"Memory Card","full_name":"Electronic > Handphone & Komputer > Memory Card","slug":"memory-card-1399"},{"pk":1400,"name":"Processor","full_name":"Electronic > Handphone & Komputer > Processor","slug":"processor-1400"}]
const secondHeaderColumn = [
  {key: 'delivery_order_number', label: 'Index Number', setup: {} },
  {key: 'marking_code', label: 'Marking Code', setup: {} },
  {key: 'origin_track_number', label: 'Origin Track Number', setup: {} },
  props.originData.length ? {key: 'cart_code', label: 'Cart Code', setup: { readOnly: true } } : null,
  {key: 'package', label: 'Tipe Penerima', setup: {} },
  {
    key: 'customer_phone_email',
    label: 'Customer phone/email',
    setup: props.originData.length ? { readOnly: true } : {}
  },
  {
    key: 'land_route',
    label: 'Route',
    setup: {type: 'dropdown', source: ["Bali","Soetah","Semarang","Surabaya","Batam","Tanjung Priok"]}
  },
  {key: 'partai_number', label: 'Number', setup: {} },
  {
    key: 'stuffing_date',
    label: 'Stuffing Date',
    setup: {
      type: 'date',
      dateFormat: 'YYYY/MM/DD',
      correctFormat: true,
      datePickerConfig: {
        firstDay: 0,
        showWeekNumber: true,
        disableDayFn(date) {
          // Disable Sunday
          return date.getDay() === 0;
        }
      }
    }
  },
  {key: 'total_weight', label: 'Weight', setup: { type: 'numeric' } },
  {key: 'weight_unit', label: 'Weight Unit', setup: {type: 'dropdown', source: ['kg', 'gram']} },
  {key: 'total_dimension_length', label: 'Length', setup: { type: 'numeric' } },
  {key: 'total_dimension_width', label: 'Width', setup: { type: 'numeric' } },
  {key: 'total_dimension_height', label: 'Height', setup: { type: 'numeric' } },
  {key: 'dimension_unit', label: 'Dimension Unit', setup: {type: 'dropdown', source: ['m', 'cm']} },
  {key: 'recipient_name', label: 'Nama Penerima', setup: {} },
  {key: 'recipient_phone_number', label: 'Telp', setup: {} },
  {key: 'province', label: 'Provinsi', setup: {} },
  {
    key: 'district',
    label: 'Kota/District',
    setup: {type: 'dropdown', source: [...districts.map(ds => ds.district)]}
  },
  {key: 'recipient_address', label: 'Alamat', setup: {} },
  {key: 'recipient_npwp', label: 'NPWP', setup: {} },
  {key: 'product_title', label: 'Product Title', setup: {} },
  {key: 'product_category_parent', label: 'Category Perent', setup: {} },
  {
    key: 'product_category',
    label: 'Category',
    setup: {type: 'dropdown', source: [...categories_flat.map(cf => cf.name)]}
  },
  {key: 'hscode', label: 'HS Code', setup: {} },
  {key: 'quantity', label: 'Qty', setup: { type: 'numeric' } },
  {
    key: 'currency_code',
    label: 'Currency',
    setup: {type: 'dropdown', source: ["CNY", "GBP", "USD", "KRW", "EUR", "JPY", "SGD"]}
  },
  {key: 'total_product_price', label: 'Total Product Price', setup: { type: 'numeric' } },
  {key: 'product_description', label: 'Description', setup: {} },
  {key: 'product_url', label: 'URL', setup: {} }
].filter(r => r)
const generateColumn = () => {
  let temp = []
  for (let second=0; second<29; second++) {
    if (second === 3) temp.push('Import a/n Blueray')
    else if (second === 5) temp.push('Soetah')
    else if (second === 9) temp.push('kg')
    else if (second === 13) temp.push('cm')
    else if (second === 25) {
      temp.push(props.agentSelected && props.agentSelected.currency_code ? props.agentSelected.currency_code : 'CNY')
    }
    else temp.push('')
  }
  return temp
}
const generateContent = () => {
  let result = []
  if (props.originData.length) {
    props.originData.forEach(origin_data => {
      let tmp = []
      secondHeaderColumn.forEach(second_header => {
        tmp.push(origin_data[second_header.key])
      })
      result.push(tmp)
    })
  } else {
    for (let first=0; first<20; first++) {
      result.push(generateColumn())
    }
  }

  return result
}
const hotComponent = ref(null)
const handsOnTableSetting = ref({
  width: '100%',
  height: 'auto',
  stretchH: 'all',
  licenseKey: 'non-commercial-and-evaluation',
  rowHeaders: true,
  data: [...generateContent()],
  nestedHeaders: [
    ['', '', '', '', '', (props.originData.length ? '' : null),
      { label: 'Partai', colspan: 3 }, { label: 'Package Information', colspan: 6 },
      { label: 'Alamat Penerima', colspan: 6 }, { label: 'Product Information', colspan: 9 }
    ].filter(r => r !== null),
    [...secondHeaderColumn.map(shc => shc.label)]
  ],
  columns: [...secondHeaderColumn.map(secHeader => secHeader.setup)],
  manualColumnResize: true,
  contextMenu: [
    {
      name: 'Insert row above',
      callback() {
        addRow(this.getSelectedLast()[0])
      }
    },
    {
      name: 'Insert row below',
      callback() {
        addRow(this.getSelectedLast()[0] + 1)
      }
    },
    'remove_row', 'hidden_columns_hide', 'hidden_columns_show',
    {
      name: 'Freeze column',
      callback() {
        handsOnTableSetting.value['fixedColumnsStart'] = this.getSelectedLast()[1]+1
      }
    },
    {
      name: 'Unfreeze column',
      callback() {
        handsOnTableSetting.value['fixedColumnsStart'] = 0
      }
    },
  ],
  hiddenColumns: {
    indicators: true,
  },
  fixedColumnsStart: 0,
  afterChange(change) {
    if (!(change && change.length)) return
    let indexColumnDistrict = secondHeaderColumn.findIndex(sec => sec.key === 'district')
    let indexColumnCategory = secondHeaderColumn.findIndex(sec => sec.key === 'product_category')
    change.forEach(item => {
      if (item[1] === indexColumnDistrict) {
        let find = districts.find(df => df.district === item[3])
        handsOnTableSetting.value.data[item[0]][item[1]-1] = find ? find['province'] : ``
      }
      if (item[1] === indexColumnCategory) {
        let find = categories_flat.find(cf => cf.name === item[3])
        if (find) {
          let split = find['full_name'].split('>')
          handsOnTableSetting.value.data[item[0]][item[1]-1] = `${split[0]} > ${split[1]}`
        }
        else handsOnTableSetting.value.data[item[0]][item[1]-1] = ``
      }
    })
  }
})
const addRow = (row=0) => {
  handsOnTableSetting.value.data.splice(row,0, generateColumn())
}
const bulkRowValue = ref(20)
const onBulkAddRow = () => {
  for (let j=0; j<bulkRowValue.value; j++) {
    handsOnTableSetting.value.data.push(generateColumn())
  }
}
const storeData = () => {
  return handsOnTableSetting.value.data.map(op => {
    let res = {}
    secondHeaderColumn.forEach((shc, index) => {
      res[shc.key]= op[index]
    })
    return (res['marking_code'] && res['customer_phone_email'] && res['product_category']) ? res : null
  }).filter(f => f)
}

</script>