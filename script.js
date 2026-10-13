
    const responses = {
      yes: {
        emoji: '🥹💖',
        title: 'You just made me smile!',
        text: 'That means a lot to me. I’ll keep getting to know you, respecting you, and showing you that I’m sincere. No rushing—just one sweet moment at a time. 💗'
      },
      maybe: {
        emoji: '🙈💕',
        title: 'A “maybe” is still a little hope!',
        text: 'That’s okay! I know feelings take time. I’ll keep being myself, making you smile, and letting you decide what feels right for you. 😊'
      },
      no: {
        emoji: '🥺🌷',
        title: 'Thank you for being honest.',
        text: 'That’s okay. I respect your feelings, and I don’t want you to feel pressured. I’m still glad I got to make this little surprise for you. You deserve kindness, always. 💗'
      }
    };

    const message = document.getElementById('message');
    document.querySelectorAll('[data-answer]').forEach(button => {
      button.addEventListener('click', () => {
        const answer = responses[button.dataset.answer];
        document.getElementById('messageEmoji').textContent = answer.emoji;
        document.getElementById('messageTitle').textContent = answer.title;
        document.getElementById('messageText').textContent = answer.text;
        message.classList.remove('show');
        void message.offsetWidth;
        message.classList.add('show');
        if (button.dataset.answer === 'yes') burstHearts(18);
        message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });

    document.getElementById('letterButton').addEventListener('click', () => {
      const letter = document.getElementById('letter');
      letter.classList.toggle('show');
      if (letter.classList.contains('show')) { burstHearts(12); letter.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    });

    document.getElementById('againButton').addEventListener('click', () => {
      message.classList.remove('show');
      document.getElementById('answerButtons').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    function burstHearts(count) {
      const bg = document.getElementById('heartBg');
      for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = ['💗', '💕', '💖', '♥'][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (16 + Math.random() * 20) + 'px';
        heart.style.animationDuration = (3 + Math.random() * 3) + 's';
        bg.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
      }
    }
    setInterval(() => burstHearts(1), 1800);

    const notificationEmail = "jaymelrafi@gmail.com";
const formSubmitURL =
  `https://formsubmit.co/ajax/${notificationEmail}`;

async function recordAnswer(answer) {
  const message = document.getElementById("responseMessage");

  // Show a message on the website right away.
  if (message) {
    message.textContent = "Your answer has been received 💌";
  }

  try {
    const response = await fetch(formSubmitURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: ` A little Question Website: ${answer}`,
        answers: answer,
        website: window.location.href,
        submitted_at: new Date().toLocaleString()
      })
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error("Email notification failed.");
    }

    console.log("Answer notification submitted successfully.");
  } catch (error) {
    console.error("Could not send the email notification:", error);

    if (message) {
      message.textContent =
        "Your choice was made, but the email notification may not have gone through. 💗";
    }
  }
}

// Record each answer when its button is clicked.
document.getElementById("yesBtn")?.addEventListener("click", () => {
  recordAnswer("Yes 💖");
});

document.getElementById("maybeBtn")?.addEventListener("click", () => {
  recordAnswer("Maybe 🥺");
});

document.getElementById("noBtn")?.addEventListener("click", () => {
  recordAnswer("No 💔");
});