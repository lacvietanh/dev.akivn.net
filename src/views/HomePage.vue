<script setup>
import Head from '../components/Head.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const projects = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('/projects.json');
    projects.value = await response.json();
  } catch (error) {
    console.error('Error loading projects:', error);
  }
});
</script>

<template>

  <Head title="AkiDEV | DEV.AkiVN.Net | Trang tài liệu lập trình tiếng Việt cho công nghệ web/app hiện đại dùng trong AkiNet"
    description="Tài liệu và hướng dẫn tiếng Việt về Vue, Vite, Firebase, Bulma, Tailwind, và các công nghệ Web/App hiện đại khác mà AkiNet sử dụng."
    keywords="vue, vite, javascript, học lập trình, tài liệu tiếng việt, firebase, nodejs, bulma, tailwind"
    :url="route.path" />
  <div class="space-y-12 md:space-y-16">
    <!-- Hero Section -->
    <section
      class="text-center pt-8 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-sm">
      <h1 class="text-3xl md:text-4xl font-extrabold mb-4 text-gray-800 dark:text-gray-100">
        Chào mừng đến AkiNet Devs
      </h1>
      <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
        Trang tài liệu lập trình tiếng Việt cho công nghệ web/app hiện đại dùng trong AkiNet.
        <br>
        <span>Khám phá các hướng dẫn code <b>Web/App hiện đại</b> dùng trong AkiNet.</span>
      </p>
    </section>

    <!-- Learning Roadmap Section -->
    <section id="learning-roadmap" class="scroll-mt-16">
      <h2 class="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Lộ trình học tập</h2>
      <p class="mb-6 text-center italic text-gray-700 dark:text-gray-300">
        Hệ sinh thái AkiNet bao gồm nhiều công nghệ hiện đại, trải dài từ phát triển frontend đến backend và ứng dụng desktop/mobile.
      </p>
      <div class="grid md:grid-cols-3 gap-3">

        <!-- Basic Roadmap -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400">Lộ trình căn bản (tối thiểu)</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Những kiến thức và công cụ nền tảng bạn cần nắm vững để làm việc với frontend:</p>
          <ul class="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><strong>HTML & CSS:</strong> Ngôn ngữ cho cấu trúc và giao diện web.</li>
            <li><strong>JavaScript:</strong> Ngôn ngữ thiết yếu cho web tương tác.</li>
            <li><strong>Công cụ phát triển:</strong> VS Code (Editor), Git (Version Control), Node.js/npm (Runtime & Package Manager).</li>
            <li><strong>Bulma (CSS Library):</strong> Framework CSS chính của AkiNet, linh hoạt, dễ sử dụng, tùy biến cao.</li>
            <li><strong>Vue.js (với Vite):</strong> Framework JavaScript hiện đại, hiệu năng cao để xây dựng UI.</li>
            <li><strong>Firebase (Frontend):</strong> Sử dụng các dịch vụ cơ bản như Authentication (Xác thực),
              Firestore (Database NoSQL), Cloud Storage (Lưu trữ file) từ phía client.</li>
            <li><strong>HTTP & RESTful API:</strong> Giao thức web và thiết kế API.</li>
          </ul>
        </div>

        <!-- Advanced Roadmap -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-2xl font-semibold mb-4 text-green-700 dark:text-green-400">Lộ trình nâng cao</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Đi sâu hơn vào hệ sinh thái, backend và các kỹ thuật nâng cao:
          </p>
          <ul class="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><strong>Vue Ecosystem:</strong> Vue Router (Định tuyến), Vuex (Quản lý trạng thái tập trung).</li>
            <li><strong>NodeJS, Websocket:</strong> Xây dựng backend, API và xử lý logic phía server.</li>
            <li><strong>Firebase (Advanced):</strong> Cloud Functions (Backend logic), Security Rules nâng cao..</li>
            <li><strong>SSR/SSG (ViteSSG):</strong> Tối ưu hóa SEO và tốc độ tải trang với Server-Side Rendering và Static Site Generation.</li>
            <li><strong>Tauri (Framework):</strong> Xây dựng ứng dụng desktop/mobile đa nền tảng với công nghệ web làm UI và RUST làm backend.</li>
            <li><strong>ElectronJS:</strong> Xây dựng ứng dụng desktop với JavaScript, HTML và CSS.</li>
          </ul>
        </div>

        <!-- Optional Roadmap -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-400">Lộ trình tùy chọn</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Các công nghệ và kỹ năng bổ sung có thể học tùy theo nhu cầu:
          </p>
          <ul class="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><strong>AI & Nghệ thuật Prompt:</strong> Sử dụng các công cụ AI để tăng năng suất lập trình.</li>
            <li><strong>SEO (Tối ưu tìm kiếm):</strong> Kỹ thuật tối ưu để tăng thứ hạng tìm kiếm.</li>
            <li><strong>Electron-Vite:</strong> Kết hợp Electron với Vite để phát triển ứng dụng desktop hiệu suất cao.</li>
            <li><strong>Rust:</strong> Ngôn ngữ lập trình hệ thống hiệu suất cao, cũng chính là phần backend của Tauri.</li>
            <li><strong>Tailwind (CSS Library):</strong> Framework CSS Utility-first, linh hoạt và tùy biến cao.</li>
            <li><strong>Testing:</strong> Vitest/Vue Test Utils để đảm bảo chất lượng mã nguồn.</li>
            <li><strong>TypeScript:</strong> Bổ sung kiểu tĩnh cho JavaScript, tăng độ tin cậy cho dự án lớn.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="current-projects" class="scroll-mt-16">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200"> Các dự án đang tiến hành </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="project in projects" :key="project.title"
          class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col h-full">
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              <a :href="project.link" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">
                {{ project.title }}
              </a>
            </h3>
            <a :href="project.link" target="_blank" class="project-url hover:underline">
              <template v-if="project.status === 'paused'">
                <i class="fa-brands fa-github h-5 w-5 text-gray-600 dark:text-gray-400"></i>
              </template>
              <template v-else>
                {{ project.url }}
              </template>
            </a>
            <span :class="['status-badge', 'status-' + project.status]">
              {{ project.status }}
            </span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{{ project.desc }}</p>
          <div class="flex flex-wrap gap-2 mt-auto pt-2">
            <span v-for="tag in project.tags" :key="tag" :class="['tag', 'tag-' + tag]">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Technologies Section -->
    <section id="technologies" class="scroll-mt-16">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">Công nghệ nổi bật</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

        <!-- HTML/CSS Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">HTML & CSS</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Nền tảng không thể thiếu của mọi trang web, định hình cấu trúc và giao diện.
          </p>
          <router-link to="/basics/html" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Tìm hiểu thêm →
          </router-link>
        </div>

        <!-- JavaScript Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">JavaScript</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Ngôn ngữ lập trình của web, tạo ra sự tương tác và tính năng động.
          </p>
          <router-link to="/basics/javascript" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Tìm hiểu thêm →
          </router-link>
        </div>

        <!-- Vue.js Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Vue.js & Vite</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Framework JavaScript tiến bộ và công cụ build siêu tốc cho trải nghiệm phát triển mượt mà.
          </p>
          <router-link to="/vue/vite-setup" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Tìm hiểu thêm →
          </router-link>
        </div>

        <!-- Bulma Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Bulma</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Framework CSS hiện đại, dễ sử dụng, dựa trên Flexbox, là lựa chọn chính tại Akinet.</p>
          <router-link to="/css/bulma" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Tìm hiểu thêm →
          </router-link> <!-- Adjust link later -->
        </div>

        <!-- Firebase Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Firebase</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Nền tảng mạnh mẽ từ Google giúp xây dựng backend, quản lý dữ liệu và xác thực người dùng.
          </p>
          <router-link to="/firebase/introduction" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Tìm hiểu thêm →
          </router-link>
          <!-- Adjust link later -->
        </div>

        <!-- Tailwind CSS Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Tailwind CSS</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Framework Utility-first linh hoạt, dùng để tinh chỉnh giao diện khi cần thiết.
          </p>
          <router-link to="/css/tailwind" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Tìm hiểu thêm →
          </router-link>
        </div>

        <!-- SEO Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">SEO (Tối ưu tìm kiếm)</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Các kỹ thuật tối ưu website để đạt thứ hạng cao hơn trong kết quả tìm kiếm.
          </p>
          <router-link to="/SEO/introduction" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Tìm hiểu thêm →
          </router-link>
        </div>
        <!-- AI & Prompt Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">AI & Nghệ thuật Prompt</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Tận dụng sức mạnh của trí tuệ nhân tạo để tăng năng suất và sáng tạo trong phát triển phần mềm.
          </p>
          <router-link to="/ai/prompt" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Tìm hiểu thêm →
          </router-link>
        </div>
        <!-- Tauri Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Tauri</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Framework tạo ứng dụng desktop và mobile siêu nhỏ gọn, hiệu năng cao với giao diện web và lõi Rust.
          </p>
          <router-link to="/tauri/introduction" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Tìm hiểu thêm →
          </router-link>
        </div>

      </div>
    </section>

  </div>
</template>
