document.addEventListener("DOMContentLoaded", () => {

  // ===========================
  // Collapsible blocks [[collapsible]]
  // ===========================
  document.querySelectorAll('.collapsible').forEach(block => {
    block.addEventListener('click', () => {
      block.classList.toggle('active');
      const content = block.nextElementSibling;
      if (!content) return;
      content.style.display = (content.style.display === 'block') ? 'none' : 'block';
    });
  });

  // ===========================
  // Tab view [[tabview]]
  // ===========================
  document.querySelectorAll('.tabview').forEach(tabview => {
    const tabs = tabview.querySelectorAll('.tab-buttons button');
    const contents = tabview.querySelectorAll('.tab-content');

    tabs.forEach((tabBtn, idx) => {
      tabBtn.addEventListener('click', () => {
        // hide all content
        contents.forEach(c => c.style.display = 'none');
        tabs.forEach(t => t.classList.remove('active'));

        // show selected
        contents[idx].style.display = 'block';
        tabBtn.classList.add('active');
      });
    });

    // Initialize first tab
    if (tabs[0]) {
      tabs[0].click();
    }
  });

  // ===========================
  // SCP rating buttons (already added in rating.ejs)
  // ===========================
  document.querySelectorAll('.scp-rating .rate-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const container = e.target.closest('.scp-rating');
      const page = container.dataset.page;
      const value = Number(e.target.dataset.value);

      try {
        const res = await fetch(`/rate/${page}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value })
        });

        const data = await res.json();
        const scoreEl = container.querySelector('.rating-score');
        scoreEl.textContent = data.score;
      } catch (err) {
        console.error('Rating error:', err);
      }
    });
  });

  // ===========================
  // Optional: collapsibles for newly added content
  // Useful if user creates page dynamically
  // ===========================
  function initCollapsibles(root=document) {
    root.querySelectorAll('.collapsible').forEach(block => {
      if (!block.dataset.init) {
        block.addEventListener('click', () => {
          block.classList.toggle('active');
          const content = block.nextElementSibling;
          if (!content) return;
          content.style.display = (content.style.display === 'block') ? 'none' : 'block';
        });
        block.dataset.init = 'true';
      }
    });
  }

  initCollapsibles();
});
