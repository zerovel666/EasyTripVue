<template>
    <TopBar />
    <div class="container">
      <h1 class="page-title">Условия пользования</h1>
      <div class="terms-content">
        <section>
          <h2>1. Общие положения</h2>
          <p>Использование сервиса EasyTrip означает ваше согласие с настоящими условиями.</p>
        </section>
        
        <section>
          <h2>2. Регистрация и аккаунт</h2>
          <p>Для бронирования требуется регистрация. Вы несете ответственность за безопасность своего аккаунта.</p>
        </section>
        
        <section>
          <h2>3. Бронирование и оплата</h2>
          <p>Все заказы должны быть оплачены в указанные сроки. Отмена возможна согласно правилам возврата.</p>
        </section>
        
        <section>
          <h2>4. Политика конфиденциальности</h2>
          <p>Мы защищаем ваши персональные данные и используем их только в рамках работы сервиса.</p>
        </section>
        
        <section>
          <h2>5. Изменения условий</h2>
          <p>Компания оставляет за собой право изменять условия без предварительного уведомления.</p>
        </section>
      </div>
    </div>
    <Footer />
  </template>
  
  <script setup>
  import Footer from '@/components/Layouts/Footer.vue';
  import TopBar from '@/components/Layouts/TopBar.vue';
  </script>
  
  <style scoped>
  .container{
    margin: 30px 0 30px 0;
  }
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .terms-content section {
    margin-bottom: 15px;
  }
  
  .terms-content h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .terms-content p {
    font-size: 14px;
    line-height: 1.5;
    color: #555;
  }
  </style>