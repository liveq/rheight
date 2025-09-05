// RHEIGHT 메인 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // 팔괘 테스트 링크 설정
    const baguaTests = {
        'astrology': 'tests/astrology.html',
        'blood-type': 'tests/blood-type.html', 
        'fortune-cookie': 'tests/fortune-cookie.html',
        'palmistry': 'tests/palmistry.html',
        'mbti': 'tests/mbti.html'
    };

    // 팔괘 아이템들에 클릭 이벤트 추가
    document.querySelectorAll('.bagua-item').forEach(item => {
        item.addEventListener('click', function() {
            const testType = this.dataset.test;
            if (baguaTests[testType]) {
                window.open(baguaTests[testType], '_blank');
            }
        });
    });

    // 태극(MBTI) 클릭 이벤트
    document.querySelector('.taiji-center').addEventListener('click', function() {
        showMBTIOptions();
    });

    // MBTI 옵션 팝업
    function showMBTIOptions() {
        const popup = document.createElement('div');
        popup.className = 'mbti-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <h3>MBTI 테스트 선택</h3>
                <div class="popup-options">
                    <button class="popup-btn yang" onclick="openMBTI('full')">
                        정식 테스트 (양 ☀)
                        <span>16문항 정밀 분석</span>
                    </button>
                    <button class="popup-btn yin" onclick="openMBTI('simple')">
                        약식 테스트 (음 ☾)
                        <span>8문항 간단 분석</span>
                    </button>
                </div>
                <button class="close-popup" onclick="closePopup()">&times;</button>
            </div>
        `;
        document.body.appendChild(popup);
        
        // 팝업 스타일 추가
        addPopupStyles();
    }

    // 팝업 스타일 동적 추가
    function addPopupStyles() {
        if (!document.querySelector('#popup-styles')) {
            const style = document.createElement('style');
            style.id = 'popup-styles';
            style.textContent = `
                .mbti-popup {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .popup-content {
                    background: linear-gradient(135deg, #1a1a2e, #16213e);
                    padding: 30px;
                    border-radius: 15px;
                    border: 2px solid #4a90e2;
                    text-align: center;
                    position: relative;
                    box-shadow: 0 0 30px rgba(74,144,226,0.5);
                }
                .popup-content h3 {
                    color: #4a90e2;
                    margin-bottom: 20px;
                    font-size: 1.5em;
                }
                .popup-options {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 20px;
                }
                .popup-btn {
                    padding: 15px 25px;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 16px;
                    font-weight: bold;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .popup-btn.yang {
                    background: linear-gradient(45deg, #fff, #f0f0f0);
                    color: #333;
                }
                .popup-btn.yin {
                    background: linear-gradient(45deg, #333, #000);
                    color: #fff;
                }
                .popup-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                }
                .popup-btn span {
                    font-size: 12px;
                    opacity: 0.8;
                }
                .close-popup {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: #e74c3c;
                    font-size: 24px;
                    cursor: pointer;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 전역 함수들
    window.openMBTI = function(type) {
        window.open(`tests/mbti.html?type=${type}`, '_blank');
        closePopup();
    };

    window.closePopup = function() {
        const popup = document.querySelector('.mbti-popup');
        if (popup) {
            popup.remove();
        }
    };

    // 배경 애니메이션 효과
    createStarfield();
});

// 별 배경 효과
function createStarfield() {
    const starContainer = document.createElement('div');
    starContainer.className = 'starfield';
    starContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
        `;
        starContainer.appendChild(star);
    }
    
    // 별 깜빡임 애니메이션
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(starContainer);
}
