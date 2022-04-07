#!/usr/bin/env node

import chalk from 'chalk'; 
import inquirer from 'inquirer'; 
import chalkAnimation from 'chalk-animation'; 
import { createSpinner } from 'nanospinner';

let namaPlayer; 
let listHadiah = [
  'Mobil', 
  'Laptop', 
  'Beasiswa ke luar negeri',
  'Motor 2tak',
]

const turu = (ms = 2000) => new Promise(
  (r) => setTimeout(r, ms)
); 

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Siapa disini yang mau Hadiah?'
  ); 
  await turu(); 
  rainbowTitle.stop();

  const wait = chalkAnimation.neon('Eits! Jawab pertanyaan berikut!');  
  await turu();
  await turu();
  wait.stop(); 

  console.log(`
${chalk.bgGray('Rules: ')}
1. Di dalam quiz ini, ada 4 pertanyaan yang diberikan. 
2. Jika jawan kamu ada yang salah satu saja, maka kamu akan ${chalk.bgGray('tereliminasi')}.
3. Jika jawaban kamu benar semua, maka kamu akan mendapatkan salah satu hadiah dari beberapa daftar hadiah berikut: 

   [
    'Mobil', 
    'Laptop', 
    'Beasiswa ke luar negeri',
    'Motor 2tak', 
   ]

Jadi berusalah untuk menjawab semua pertanyaan dengan benar....
`)
}

// Pilihan dia ingin masuk ke game atau tidak 
async function lanjut() {
  const pilihan = await inquirer.prompt({
    name: 'pilihan_player', 
    type: 'input', 
    message: 'Mau lanjut masuk ke Game? (Type Y or N)', 
  });

  return enter(pilihan.pilihan_player == 'Y');
}

// buat ngecek si player memang pengen main atau nggak
async function enter(isEnter) {
  const spinner = createSpinner('Mengecek pilihan....').start(); 
  await turu();

  if (isEnter) {
    spinner.success({ text: 'Kamu memasuki Permainan!'}); 
    await turu();
    console.clear();
  } 

  else {
    console.clear();
    spinner.error({ text: 'Kamu membatalkan permainan!'});
    await turu();
    process.exit(1);
  }
}

// Ask player's name 
async function tanyaNama() {
  const jawaban = await inquirer.prompt({
    name: 'nama_player',
    type: 'input', 
    message: 'Siapa nama kamu?', 
  });

  namaPlayer = jawaban.nama_player;
}

// Question 1 
async function pertanyaan1() {
  console.log('\nPertanyaan pertama: '); 
  const jawaban = await inquirer.prompt({
    name: 'Pertanyaan_1', 
    type: 'list', 
    message: 'Javascript dengan static typing yang dibuat oleh Microsoft adalah?\n', 
    choices: [
      'Typescript', 
      'Golang', 
      'Dart',
    ], 
  }); 

  return handleAnswer(jawaban.Pertanyaan_1 == 'Typescript');
}

// Question 2
async function pertanyaan2() {
  console.log('\nPertanyaan kedua: '); 
  const jawaban = await inquirer.prompt({
    name: 'Pertanyaan_2', 
    type: 'list', 
    message: 'Ibukota Provinsi Bangka Belitung terletak di?\n', 
    choices: [
      'Tuatunu', 
      'Selindung Baru', 
      'Pangkalpinang',
    ], 
  }); 

  return handleAnswer(jawaban.Pertanyaan_2 == 'Pangkalpinang');
}

// Question 3 
async function pertanyaan3() {
  console.log('\nPertanyaan ketiga: '); 
  const jawaban = await inquirer.prompt({
    name: 'Pertanyaan_3', 
    type: 'list',
    message: 'Di bulan Ramadhan, kita dianjurkan untuk?\n', 
    choices: [
      'Mengerjakan segala amal baik, karena pahalanya dilipatgandakan',
      'Turu sepanjang hari', 
      'Berfoya-foya'
    ],
  });

  return handleAnswer(jawaban.Pertanyaan_3 == 'Mengerjakan segala amal baik, karena pahalanya dilipatgandakan'); 
}

async function pertanyaan4() {
  console.log('\nPertanyaan keempat: '); 
  const jawaban = await inquirer.prompt({
    name: 'Pertanyaan_4', 
    type: 'list', 
    message: 'Pada 10 malam terakhir bulan Ramadhan, terdapat sebuah malam yang sangat istimewa, yang bahkan lebih baik daripada 1000 bulan(Al-Qadar ayat 3), malam apakah itu?\n', 
    choices: [
      'Malam satu suro', 
      'Malam Jumat', 
      'Lailatul Qadar',
    ], 
  }); 

  return handleAnswer(jawaban.Pertanyaan_4 == 'Lailatul Qadar');
}


// handle Jawaban Question 1, 2, dan 3 
async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Mengecek jawaban....').start(); 
  await turu();

  if (isCorrect) {
    spinner.success({ text: `Mantap, ${namaPlayer}. Jawabanmu benar`}); 
  } 

  else {
    console.clear();
    spinner.error({ text: 'Jawabanmu salah. Kamu tereliminasi!'});
    await turu();
    process.exit(1); 
  }
}

// Apabila jawabannya benar sampai akhir, maka dapat hadiah(random)
async function pemenang() {
  console.clear();
  const psn = chalkAnimation.rainbow(
    `Selamat, ${namaPlayer}. Kamu mendapatkan ${listHadiah[Math.floor(Math.random() * listHadiah.length)]}`
  );

  await turu(); 
  psn.stop();
}

await welcome();
await lanjut();
await tanyaNama(); 
await pertanyaan1();
await pertanyaan2(); 
await pertanyaan3(); 
await pertanyaan4(); 
await pemenang();
