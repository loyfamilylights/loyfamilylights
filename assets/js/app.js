(function () {
  "use strict";

  const SHOW_CONFIG = {
    // Adjustable default start time.
    // Your original site says "Sunset"; this uses 7:00 PM for countdown math.
    // Change to "20:00" for 8 PM, "18:30" for 6:30 PM, etc.
    startTime: "21:00",

    // JavaScript day numbers:
    // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday,
    // 4 = Thursday, 5 = Friday, 6 = Saturday.
    endTimes: {
      0: "22:00",
      1: "22:00",
      2: "22:00",
      3: "22:00",
      4: "22:00",
      5: "23:00",
      6: "23:00"
    }
  };

  const pad = (value) => String(value).padStart(2, "0");

  function parseTimeToDate(baseDate, timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const result = new Date(baseDate);

    result.setHours(hours, minutes, 0, 0);

    return result;
  }

  function formatDateTime(date) {
    return new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(date);
  }

  function getShowWindow(date) {
    const start = parseTimeToDate(date, SHOW_CONFIG.startTime);
    const end = parseTimeToDate(date, SHOW_CONFIG.endTimes[date.getDay()]);

    return { start, end };
  }

  function getNextShowInfo(now) {
    const todayWindow = getShowWindow(now);

    if (now >= todayWindow.start && now <= todayWindow.end) {
      return {
        isLive: true,
        target: todayWindow.end,
        start: todayWindow.start,
        end: todayWindow.end
      };
    }

    if (now < todayWindow.start) {
      return {
        isLive: false,
        target: todayWindow.start,
        start: todayWindow.start,
        end: todayWindow.end
      };
    }

    for (let offset = 1; offset <= 8; offset += 1) {
      const candidate = new Date(now);
      candidate.setDate(now.getDate() + offset);
      const candidateWindow = getShowWindow(candidate);

      return {
        isLive: false,
        target: candidateWindow.start,
        start: candidateWindow.start,
        end: candidateWindow.end
      };
    }

    return {
      isLive: false,
      target: todayWindow.start,
      start: todayWindow.start,
      end: todayWindow.end
    };
  }

  function getDurationParts(milliseconds) {
    const safeMilliseconds = Math.max(0, milliseconds);
    const totalSeconds = Math.floor(safeMilliseconds / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  }

  function setText(selector, text) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = text;
    });
  }

  function updateCountdown() {
    const now = new Date();
    const showInfo = getNextShowInfo(now);
    const diff = showInfo.target.getTime() - now.getTime();
    const parts = getDurationParts(diff);

    setText("[data-countdown-days]", pad(parts.days));
    setText("[data-countdown-hours]", pad(parts.hours));
    setText("[data-countdown-minutes]", pad(parts.minutes));
    setText("[data-countdown-seconds]", pad(parts.seconds));

    const compactCountdown = showInfo.isLive
      ? "Live Now"
      : `${parts.days}d ${pad(parts.hours)}h ${pad(parts.minutes)}m`;

    setText("[data-countdown-label]", compactCountdown);

    if (showInfo.isLive) {
      setText("[data-show-status]", "The Show Is Live Now");
      setText(
        "[data-show-message]",
        `Tune to 92.5 FM. Tonight's show runs until ${formatDateTime(showInfo.end)}.`
      );
      return;
    }

    setText("[data-show-status]", "Next Show Starts Soon");
    setText(
      "[data-show-message]",
      `The next patriotic light show starts ${formatDateTime(showInfo.start)}. Tune to 92.5 FM when you arrive.`
    );
  }

  function setupMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function init() {
    setupMobileMenu();
    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
