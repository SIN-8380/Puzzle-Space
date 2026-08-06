// Catalog Data with Image Credits
const puzzlesData = [
  {
    id: "1",
    title: "Cat",
    category: "abstract",
    image: "images/cat.jpg",
    url: "https://jigex.com/J73tUG",
    author: "Local Asset",
    license: "Personal Collection",
  },
  {
    id: "2",
    title:
      "Vibrant abstract expressionist art with bold colors and dynamic brush strokes.",
    category: "abstract",
    image: "images/abstract1.jpg",
    url: "https://jigex.com/iq5YQX",
    author: "Steve A Johnson",
    license: "Personal Collection",
  },
  {
    id: "7",
    title: "Lion Lotus Flower",
    category: "nature",
    image: "images/nature1.jpg",
    url: "https://jigex.com/7wWr9E",
    author: "Unsplash / Forest Collection",
    license: "Free to use",
  },
  {
    id: "3",
    title: "Classic Oil Painting",
    category: "art",
    image: "images/fineart.jpg",
    url: "https://jigex.com/J73tUG",
    author: "Unsplash / Art Gallery",
    license: "Free to use",
  },
 {
    id: "4",
    title: "Gothic Cathedral Tower",
    category: "architecture",
    image: "images/Architecture.jpg",
    url: "https://jigex.com/nPut69",
    author: "Pexels / Mehmet Turgut Kirkgoz",
    license: "Free to use",
  },
  {
    id: "5",
    title: "Cheetah Monochrome",
    category: "animals",
    image: "images/cheetah-monochrome-4400x2160-13220.jpg",
    url: "https://jigex.com/VR4YBN",
    author: "Unsplash / Wildlife",
    license: "Free to use",
  },
  {
    id: "6",
    title: "Abstract Painting",
    category: "abstract",
    image:
      "images/abstract2.jpg",
    url: "https://jigex.com/KU8zS2",
    author: "Unsplash / BERTRY Nicole",
    license: "Free to use under the Unsplash License",
  },
   {
    id: "9",
    title: "Ponyo",
    category: "art",
    image: "images/img.jpg",
    url: "https://jigex.com/TT3iqS",
    author: "wallpapercat",
    license: "Free to use",
  },
  {
    id: "8",
    title: "Serene Landscape ",
    category: "nature",
    image: "images/nature2.jpg",
    url: "https://jigex.com/mBuY9Z",
    author: "Pexels / kien virak",
    license: "Free to use",
  },
];

let currentCategory = "all";
let searchQuery = "";

// DOM Elements
const puzzleGrid = document.getElementById("puzzleGrid");
const emptyState = document.getElementById("emptyState");
const sectionTitle = document.getElementById("sectionTitle");
const puzzleCountBadge = document.getElementById("puzzleCountBadge");
const categoryBtns = document.querySelectorAll(".category-btn");
const searchInput = document.getElementById("searchInput");

// Toggle In-Card Image Credit Overlay
function toggleCreditOverlay(event, puzzleId) {
  event.stopPropagation(); // Stops card click / redirect to Jigex

  const overlay = document.getElementById(`credit-overlay-${puzzleId}`);
  if (overlay) {
    overlay.classList.toggle("opacity-0");
    overlay.classList.toggle("pointer-events-none");
  }
}

// Prevent opening Jigex when clicking inside details links
function preventCardClick(event) {
  event.stopPropagation();
}

// Render Puzzles Function
function renderPuzzles() {
  const filtered = puzzlesData.filter((puzzle) => {
    const matchesCategory =
      currentCategory === "all" || puzzle.category === currentCategory;
    const matchesSearch = puzzle.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  puzzleCountBadge.textContent = filtered.length;

  if (filtered.length === 0) {
    puzzleGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  puzzleGrid.innerHTML = filtered
    .map(
      (puzzle) => `
        <div 
          onclick="window.open('${puzzle.url}', '_blank', 'noopener,noreferrer')"
          class="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/40 dark:hover:shadow-none flex flex-col justify-between relative"
        >
          <!-- Image Box Container -->
          <div class="relative overflow-hidden aspect-[4/3] bg-slate-200 dark:bg-slate-800">
            <!-- Background Image -->
            <img 
              src="${puzzle.image}" 
              alt="${puzzle.title}" 
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            <!-- Default Play Overlay on Hover -->
            <div class="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div class="w-10 h-10 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                <i class="ri-play-fill text-lg ml-0.5"></i>
              </div>
            </div>

            <!-- Image Info / Credit Toggle Button (Top Right) -->
            <button 
              type="button" 
              onclick="toggleCreditOverlay(event, '${puzzle.id}')"
              title="Toggle image details and credits"
              class="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center text-xs opacity-90 hover:opacity-100 transition-all shadow-md"
            >
              <i class="ri-information-line"></i>
            </button>

            <!-- In-Card Blurry Credit Details Overlay -->
            <div 
              id="credit-overlay-${puzzle.id}"
              class="absolute inset-0 z-10 bg-slate-950/75 backdrop-blur-md p-4 text-white flex flex-col justify-between opacity-0 pointer-events-none transition-all duration-300"
            >
              <div>
                <div class="flex items-center justify-between border-b border-white/20 pb-2 mb-2">
                  <span class="text-[11px] font-bold text-slate-200 uppercase tracking-wider">Image Details</span>
                  <button 
                    onclick="toggleCreditOverlay(event, '${puzzle.id}')" 
                    class="text-xs text-slate-300 hover:text-white"
                  >
                    <i class="ri-close-line"></i>
                  </button>
                </div>

                <div class="space-y-1.5 text-xs">
                  <p class="text-slate-300"><span class="text-slate-400">Credit:</span> ${puzzle.author || "Unsplash"}</p>
                  <p class="text-slate-300"><span class="text-slate-400">License:</span> ${puzzle.license || "Free Use"}</p>
                </div>
              </div>

              <!-- Direct Link to Original Image Source -->
              <a 
                href="${puzzle.image}" 
                target="_blank" 
                rel="noopener noreferrer"
                onclick="preventCardClick(event)"
                class="w-full py-1.5 px-3 bg-white/20 hover:bg-white/30 text-white font-semibold text-[11px] rounded-lg flex items-center justify-center gap-1.5 backdrop-blur-sm transition-colors"
              >
                <span>View Full Source</span>
                <i class="ri-external-link-line text-xs"></i>
              </a>
            </div>
          </div>

          <!-- Title & Category Info -->
          <div class="p-3.5 sm:p-4 flex items-center justify-between gap-2">
            <div class="min-w-0 flex-1">
              <h3 class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                ${puzzle.title}
              </h3>
              <p class="text-[10px] sm:text-[11px] text-slate-400 capitalize mt-0.5">${puzzle.category}</p>
            </div>
            <i class="ri-external-link-line text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-xs sm:text-sm shrink-0"></i>
          </div>
        </div>
      `,
    )
    .join("");
}

// Category Button Handlers
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach((b) => {
      b.className =
        "category-btn px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-200/60 dark:hover:bg-slate-800 shrink-0";
    });

    btn.className =
      "category-btn active px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm shrink-0";

    currentCategory = btn.getAttribute("data-category");

    // Update Section Title
    const catText = btn.textContent.trim();
    sectionTitle.textContent =
      currentCategory === "all" ? "All Puzzles" : catText;

    renderPuzzles();
  });
});

// Search Handler
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderPuzzles();
  });
}

// Dark Mode Toggle Logic
const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const htmlElement = document.documentElement;

function setTheme(isDark) {
  if (isDark) {
    htmlElement.classList.add("dark");
    htmlElement.classList.remove("light");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
    localStorage.setItem("theme", "dark");
  } else {
    htmlElement.classList.remove("dark");
    htmlElement.classList.add("light");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
    localStorage.setItem("theme", "light");
  }
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  setTheme(true);
} else {
  setTheme(false);
}

themeToggle.addEventListener("click", () => {
  setTheme(!htmlElement.classList.contains("dark"));
});

// Initial render
renderPuzzles();
