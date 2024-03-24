import  { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [cardUrl, setCardUrl] = useState('');

  const generateCard = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 650;
  canvas.height = 850;

  const bgImage = new Image();
  bgImage.src = './bg.jpg';
  bgImage.onload = () => {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    ctx.font = '40px Syne';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    // Set "Happy Birthday" message at the bottom with margin
    const greeting = `Happy Birthday, ${name}💖🎉🥳!`;
    const maxWidth = canvas.width - 100; // Adjust this value according to your layout
    const lineHeight = 50; // Adjust this value according to your font size
    let words = greeting.split(' ');
    let line = '';
    let y = canvas.height - 150;

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    setCardUrl(canvas.toDataURL('image/jpeg'));
  };
};

  const downloadCard = () => {
    const link = document.createElement('a');
    link.href = cardUrl;
    link.download = 'birthday_card.jpg';
    link.click();
  };

  return (
    <div className="container">
      <h1>Birthday Card Generator</h1>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="name-input"
      />
      <button onClick={generateCard} className="generate-button">Generate Card</button>
      {cardUrl && (
        <div className="card-container">
          <img src={cardUrl} alt="Birthday Card" className="card-image" />
          <button onClick={downloadCard} className="download-button">Download Card</button>
        </div>
      )}
    </div>
  );
}

export default App;
