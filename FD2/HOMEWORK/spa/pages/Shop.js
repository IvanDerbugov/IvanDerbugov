import { renderMutant1 } from '../moduls/mutant1.js';
import { renderMutant2 } from '../moduls/mutant2.js';

const renderShop = () => {
return `
<section class="shop container">
    <h3 data-translate="Каталог мутантов">Каталог мутантов</h3>
    <div class="mutants-list">
        <div class="mutant-item flex">
            <img src="img/bacteria.svg" alt="" id="bacteria">
            <div class="mutant-item-info">
                <h4 data-translate="Бактерия">Бактерия</h4>
                <p class="mutant-description" data-translate="bacteria-description">Бактерии - это элементарный вид
                    жизни, микроскопические организмы, которые были одними из первых обитателей Криптоне. Их появление
                    на планете миллионы световых лет назад стало ключевым моментом в зарождении жизни, положив начало
                    многообразию форм разума. Они представляют собой крошечных, но очень вредных мутантов, способных
                    увеличивать шанс мутации у других существ. Их главная цель - выжить любой ценой. Не смотря на злой
                    вид и не особо дружелюбное поведение из-за своего размера особой опасности не представляют.</p>
                <button class="read-more-btn" data-translate="читать полностью">читать полностью</button>
                <div class="mutant-price flex">
                    <span>100</span>
                    <img src="img/coin.svg" alt="коины">
                </div>
                <button class="buy-btn" id="buyBacteria" data-price="100" data-translate="купить">купить</button>
            </div>
        </div>
        <div class="mutant-item flex">
            <svg height="800px" width="800px" version="1.1" id="mutant1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"> 
                ${renderMutant1()}
            </svg>
            <div class="mutant-item-info">
                <h4 data-translate="Зелёный Радист">Зелёный Радист</h4>
                <p class="mutant-description" data-translate="mutant1-description">Зелёный Радист - уникальный мутант с
                    двумя мощными антеннами на голове, которые излучают особые сигналы дружелюбия. Его яркий зелёный
                    окрас появился в результате мутации после поглощения редких кристаллов зелёной энергии, найденных в
                    глубинах криптонских пещер. Главная особенность этого мутанта - способность посылать успокаивающие
                    радиосигналы всем окружающим мутантам, значительно повышая их настроение и дружелюбие. Благодаря
                    этому он может создавать гармонию в группе мутантов, снижая агрессию и конфликты. Однако, кроме этой
                    способности, он практически бесполезен - не обладает силой, скоростью или интеллектом. Его часто
                    используют как "живой генератор хорошего настроения" в колониях мутантов, где важна стабильность и
                    мирное сосуществование.</p>
                <button class="read-more-btn" data-translate="читать полностью">читать полностью</button>
                <div class="mutant-price flex">
                    <span>250</span>
                    <img src="img/coin.svg" alt="коины">
                </div>
                <button class="buy-btn" id="buyMutant1" data-price="250" data-translate="купить">купить</button>
            </div>
        </div>
        <div class="mutant-item flex">
            <svg version="1.1" id="mutant2" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="282px"
                viewBox="0 0 300 282" xml:space="preserve">
                ${renderMutant2()}
            </svg>
            <div class="mutant-item-info">
                <h4 data-translate="Спринтер">Спринтер</h4>
                <p class="mutant-description" data-translate="mutant2-description">Фиолетовый Спринтер - один из самых
                    необычных обитателей Криптона. Его яркий окрас появился в результате редкой мутации после контакта с
                    кристаллами фиолетовой энергии, которые он по своей глупости сожрал. Несмотря на то, что он не
                    отличается особым интеллектом и часто ведёт себя трусливо, его главное преимущество - невероятная
                    скорость. Он может развивать скорость до 200 земных км в час, что делает его идеальным разведчиком.
                    Его трусость на самом деле - это инстинкт самосохранения, который помог ему выжить в суровых
                    условиях Криптона. Когда он чувствует опасность, его фиолетовая кожа начинает светиться,
                    предупреждая других об угрозе.</p>
                <button class="read-more-btn" data-translate="читать полностью">читать полностью</button>
                <div class="mutant-price flex">
                    <span>400</span>
                    <img src="img/coin.svg" alt="коины">
                </div>
                <button class="buy-btn" id="buyMutant2" data-price="400" data-translate="купить">купить</button>
            </div>
        </div>
    </div>
</section>
`;
}

// Экспортируем для использования в модулях
export { renderShop };

// Делаем доступной глобально для script.js
window.renderShop = renderShop;