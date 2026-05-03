document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for scroll animations (fade-in)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 2. Mouse tracking for glass cards glow effect
    const cards = document.querySelectorAll('.hover-glow');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 3. Modal Logic for Project Details
    const projectData = {
        "legend": {
            title: "영웅전설:가가브트릴로지",
            role: "메인 기획",
            image: "assets/proj_legend_heroes.png",
            content: `
                <p><strong>기간:</strong> 2023.05 ~ 2026.02</p>
                <div style="margin-top: 10px; margin-bottom: 10px;">
                    <span class="badge">#Dev</span>
                    <span class="badge">#Global</span>
                    <span class="badge">#Live</span>
                    <span class="badge">#수집형RPG</span>
                </div>
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.1);">
                <h4 style="color: #fff; margin-bottom: 10px;">1. 프로젝트 개요</h4>
                <ul style="margin-bottom: 20px;">
                    <li><strong>핵심 컨셉:</strong> 영웅전설 IP를 활용한 수집형 RPG</li>
                    <li><strong>주요 타겟:</strong> 영웅전설 IP를 알고 있는 3,40대 모바일 게임 유저</li>
                </ul>
                <h4 style="color: #fff; margin-bottom: 10px;">2. 주요 담당 업무</h4>
                <ul>
                    <li style="margin-bottom: 10px;"><strong>메인 컨텐츠 기획:</strong>
                        <ul style="margin-top: 5px;">
                            <li>수집형 RPG에서 플레이 패턴이 하나의 루트로 고정되면 유저 성향에 따른 이탈이 발생</li>
                            <li>모험·요일던전·무한의 탑·로그라이크 등 장르별 특성이 다른 컨텐츠를 설계</li>
                            <li>각 전용 코인을 재화 상점에서 교환하는 통합 보상 시스템으로 연결</li>
                            <li>기존 수집형 RPG 공식 도입으로 신규 유저 진입 장벽 완화</li>
                            <li>다장르 구성으로 유저별 플레이 스타일 대응 가능, 장기 체류 및 성장 체감 유도</li>
                        </ul>
                        <img src="assets/영웅전설 가가브트릴로지/image.png" class="modal-inline-img" alt="전투 컨텐츠 목록 UI">
                        <img src="assets/영웅전설 가가브트릴로지/image 1.png" class="modal-inline-img" alt="무한의 탑 컨텐츠 UI">
                        <ul style="margin-top: 5px;">
                            <li>길드 레이드·출석·상점을 포함한 길드 시스템을 기획하여 소속감과 경쟁·협력 구조를 동시에 제공</li>
                            <li>유저 간 유대감 형성으로 플레이 지속성 유지, 길드 경쟁을 통한 성장 욕구 자극</li>
                        </ul>
                        <img src="assets/영웅전설 가가브트릴로지/image 2.png" class="modal-inline-img" alt="길드 메인 UI">
                        <img src="assets/영웅전설 가가브트릴로지/image 3.png" class="modal-inline-img" alt="길드 레이드 입장 UI">
                    </li>
                    <li style="margin-bottom: 10px;"><strong>시즌 이벤트 기획:</strong>
                        <ul style="margin-top: 5px;">
                            <li>정기 업데이트 없는 라이브 서비스는 신선함이 사라지며 Retention이 하락</li>
                            <li>IP 외전 스토리 기반 시즌 이벤트를 설계하고 시즌 스케줄 시스템으로 일정 주기마다 새 컨텐츠를 오픈</li>
                            <li>미니게임 및 이벤트 전투 컨텐츠로 다양한 보상 루트를 확보</li>
                            <li>세계관 확장으로 IP 팬층 유입, 미니게임을 통한 플레이 타임 증가 및 성장 재화 획득 기회 제공</li>
                        </ul>
                        <img src="assets/영웅전설 가가브트릴로지/image 4.png" class="modal-inline-img" alt="시즌 이벤트 시스템 기획서">
                        <img src="assets/영웅전설 가가브트릴로지/image 5.png" class="modal-inline-img" alt="시즌 이벤트 - 미니게임 시스템 기획서">
                    </li>
                    <li style="margin-bottom: 10px;"><strong>시스템 기획:</strong>
                        <ul style="margin-top: 5px;">
                            <li><strong>스태미너 충전 시스템:</strong> 최대치 도달 시 충전이 멈추는 구조는 강제 접속 부담으로 유저 피로도를 높임. 자동 충전과 유료 충전을 이원화하여 최대치 초과 충전이 가능하도록 설계. 접속 압박 해소로 유저 편의성 향상</li>
                        </ul>
                        <img src="assets/영웅전설 가가브트릴로지/image 6.png" class="modal-inline-img" alt="일반 / 충전 입장권 보유량 표시 팝업">
                        <ul style="margin-top: 5px;">
                            <li><strong>텔레포트 구조 개선:</strong> 맵이 넓어질수록 이동 시간이 늘어 플레이 흐름이 끊김. 맵 내 특정 지점에 트리거를 배치하여 해당 위치 도달 시 자동으로 텔레포트되는 방식으로 이동 UX를 간소화</li>
                            <li><strong>추천 팀 편성:</strong> 신규 유저가 팀 구성을 모르면 콘텐츠 진입 장벽이 높아져 초기 이탈로 이어짐. 유저의 전투 데이터 스냅샷 기반 자동 팀 추천 시스템을 설계. 신규 유저가 적합한 팀으로 쉽게 도전할 수 있도록 구성, 진입 장벽 완화 및 콘텐츠 참여율 향상</li>
                        </ul>
                        <img src="assets/영웅전설 가가브트릴로지/image 7.png" class="modal-inline-img" alt="추천 팀 편성 시스템 UI 팝업">
                    </li>
                </ul>
            `
        },
        "moonlight": {
            title: "달빛조각사 & 다크게이머",
            role: "서브 기획",
            image: "assets/proj_moonlight.png",
            content: `
                <p><strong>기간:</strong> 2021.06 ~ 2023.04</p>
                <div style="margin-top: 10px; margin-bottom: 10px;">
                    <span class="badge">#Dev</span>
                    <span class="badge">#Global</span>
                    <span class="badge">#Live</span>
                    <span class="badge">#MMORPG</span>
                    <span class="badge">#UNITY</span>
                </div>
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.1);">
                <h4 style="color: #fff; margin-bottom: 10px;">1. 프로젝트 개요</h4>
                <ul style="margin-bottom: 20px;">
                    <li><strong>핵심 컨셉:</strong> 달빛조각사 IP를 활용한 MMORPG</li>
                    <li><strong>주요 타겟:</strong> 3,40대 MMORPG 유저 및 리니지, 오딘류의 게임을 좋아하는 유저</li>
                </ul>
                <h4 style="color: #fff; margin-bottom: 10px;">2. 주요 담당 업무</h4>
                <ul>
                    <li style="margin-bottom: 10px;"><strong>시스템 기획:</strong>
                        <ul style="margin-top: 5px;">
                            <li><strong>이벤트 시스템:</strong> MMORPG는 매일 접속하는 루틴 동기가 없으면 Retention이 급격히 하락. 미션을 일차별로 순차 해금하여 매일 접속하지 않으면 얻을 수 없는 보상 구조를 설계. 데일리 루틴 형성을 유도하여 Retention 개선에 기여</li>
                        </ul>
                        <img src="assets/달빛조각사 & 다크게이머/image.png" class="modal-inline-img" alt="이벤트 시스템 기획서">
                        <ul style="margin-top: 5px;">
                            <li><strong>시스템 개선:</strong> 라이브 서비스 중 유저 불편 요소가 방치되면 이탈이 누적되어 회복이 어려워짐. 지표 데이터와 유저 피드백 기반으로 불편 요소를 선제 발굴하고 개편안 수립 및 반영을 직접 주도. UX 만족도 향상 및 이탈 감소</li>
                        </ul>
                        <img src="assets/달빛조각사 & 다크게이머/image 1.png" class="modal-inline-img" alt="장비 개조 개선 시스템 기획서">
                    </li>
                    <li style="margin-bottom: 10px;"><strong>이벤트 기획:</strong>
                        <ul style="margin-top: 5px;">
                            <li>별도 이벤트 진입 동선이 있으면 참여율이 낮아지기 때문에, 일반 플레이 동선 안에서 이벤트 참여가 자연스럽게 발생하도록 미션·보상 구조를 설계하여 플레이 자체가 이벤트 참여가 되도록 구성</li>
                            <li>이벤트 참여율 향상, 기존 콘텐츠와 이벤트 보상 연계로 플레이 시간 증가</li>
                        </ul>
                        <img src="assets/달빛조각사 & 다크게이머/image 2.png" class="modal-inline-img" alt="이벤트 기획 문서">
                    </li>
                    <li style="margin-bottom: 10px;"><strong>컨텐츠 기획:</strong>
                        <ul style="margin-top: 5px;">
                            <li><strong>레이드 보스:</strong> 단일 보스를 반복하는 구조는 전투가 단조로워져 체류 시간이 짧아짐. 웨이브 시스템 기반으로 보스를 순차 스폰하는 구조를 설계. 웨이브마다 다른 패턴 조합으로 전투 긴장감과 전략적 다양성을 부여, 반복 플레이에도 신선함 유지</li>
                        </ul>
                        <img src="assets/달빛조각사 & 다크게이머/image 3.png" class="modal-inline-img" alt="웨이브 보스전 컨텐츠 기획서">
                        <ul style="margin-top: 5px;">
                            <li><strong>협동 구조:</strong> 레이드 컨텐츠에 고렙 유저만 참여 가능하면 저렙 유저가 소외되어 유저 풀이 분리됨. 고렙·저렙 유저가 서로의 약점을 보완하는 역할 분담 구조로 설계하여 양쪽 모두 참여 이유를 갖도록 구성, 유저 풀 확장 및 커뮤니티 응집력 강화</li>
                            <li><strong>신규 직업:</strong> 직업 추가 시 기존 시스템과의 충돌을 개발 단계에서 발견하면 수정 비용이 크고 출시가 지연됨. 추가 전 기존 스킬·장비·밸런스 데이터와의 충돌 요소를 선제 파악하고 예외 처리 케이스를 정리하여 개발팀에 전달. 출시 전 밸런스 검토 주도로 버그·밸런스 이슈 최소화</li>
                        </ul>
                        <img src="assets/달빛조각사 & 다크게이머/image 4.png" class="modal-inline-img" alt="2차 전직 추가 시스템 기획서">
                    </li>
                </ul>
            `
        },
        "madworld": {
            title: "MADWORLD",
            role: "리드 기획",
            image: "assets/proj_madworld.png",
            content: `
                <p><strong>기간:</strong> 2019.11 ~ 2021.05</p>
                <div style="margin-top: 10px; margin-bottom: 10px;">
                    <span class="badge">#Dev</span>
                    <span class="badge">#Global</span>
                    <span class="badge">#HTML5</span>
                    <span class="badge">#MMORPG</span>
                </div>
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.1);">
                <h4 style="color: #fff; margin-bottom: 10px;">1. 프로젝트 개요</h4>
                <ul style="margin-bottom: 20px;">
                    <li><strong>핵심 컨셉:</strong> 2D 웹 기반 MMORPG</li>
                    <li><strong>주요 타겟:</strong> 고어한 컨셉을 좋아하는 20대 MMORPG 유저</li>
                </ul>
                <h4 style="color: #fff; margin-bottom: 10px;">2. 주요 담당 업무</h4>
                <ul>
                    <li style="margin-bottom: 10px;"><strong>인스턴스 던전:</strong>
                        <ul style="margin-top: 5px;">
                            <li>엔드게임 콘텐츠가 파밍 목적지 없이 단순 진행형이면 클리어 후 반복 플레이 동기가 사라짐</li>
                            <li>던전마다 특정 아이템 파밍에 특화된 루프 구조로 설계하여 캐릭터 육성 목표와 파밍 동선을 직접 연결</li>
                            <li>목표가 명확한 반복 파밍 패턴 형성, 성장 사이클 내 지속적 접속 동기 확보</li>
                        </ul>
                    </li>
                    <li style="margin-bottom: 10px;"><strong>보스 패턴 기획:</strong>
                        <ul style="margin-top: 5px;">
                            <li>단순 스탯 싸움 구조는 전투 자체의 재미가 없어 체류 시간이 짧아지고 재도전 욕구가 없음</li>
                            <li>BT(Behavior Tree) 기반으로 체력 구간마다 행동 패턴이 전환되는 페이즈 전환 보스를 설계하여 유저가 패턴을 학습하고 공략을 발전시키는 경험을 제공</li>
                            <li>전투 긴장감 유지 및 공략 연구 욕구 자극, 자발적인 재도전 반복 유도</li>
                        </ul>
                        <img src="assets/MADWORLD/매드월드1.png" class="modal-inline-img" alt="보스레이드 기획서 및 테이블">
                    </li>
                    <li style="margin-bottom: 10px;"><strong>인터렉션 오브젝트:</strong>
                        <ul style="margin-top: 5px;">
                            <li>던전이 전투만으로 채워지면 단조로워 탐험 욕구가 없어지고 맵 활용도가 낮아짐</li>
                            <li>세계관 스토리와 연결된 인터렉션 오브젝트를 배치하고 직접 조작하는 행동감 중심으로 설계하여 전투 외 플레이 요소를 확보</li>
                            <li>탐험 몰입감 강화, 맵 구석구석 탐색 유도로 콘텐츠 체류 시간 증가에 기여</li>
                        </ul>
                        <img src="assets/MADWORLD/매드월드2.png" class="modal-inline-img" alt="인터렉션 오브젝트 기획서">
                    </li>
                    <li style="margin-bottom: 10px;"><strong>레벨 디자인:</strong>
                        <ul style="margin-top: 5px;">
                            <li>쿼터뷰 시점으로 높낮이 있는 지형을 활용해 공간감을 확보</li>
                            <li>세계관 연계 컨셉을 통한 몬스터 스폰·기믹·퍼즐을 단계적으로 배치, 지형 지물을 활용한 전투 구도 고려</li>
                            <li>탐험과 전투가 조화를 이루는 레벨 경험 제공</li>
                        </ul>
                        <img src="assets/MADWORLD/매드월드3.png" class="modal-inline-img" alt="캐릭터 컨셉 및 전투 맵 기획서">
                    </li>
                </ul>
            `
        },
        "warofcrown": {
            title: "WAROFCROWN",
            role: "서브 기획",
            image: "assets/proj_warofcrown.png",
            content: `
                <p><strong>기간:</strong> 2016.11 ~ 2017.10</p>
                <div style="margin-top: 10px; margin-bottom: 10px;">
                    <span class="badge">#Dev</span>
                    <span class="badge">#Global</span>
                    <span class="badge">#Live</span>
                    <span class="badge">#UNITY</span>
                    <span class="badge">#수집형RPG</span>
                </div>
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.1);">
                <h4 style="color: #fff; margin-bottom: 10px;">1. 프로젝트 개요</h4>
                <ul style="margin-bottom: 20px;">
                    <li><strong>핵심 컨셉:</strong> 수집형 턴제 SRPG</li>
                    <li><strong>주요 타겟:</strong> 전통 SRPG를 좋아하는 2,30대 유저</li>
                </ul>
                <h4 style="color: #fff; margin-bottom: 10px;">2. 주요 담당 업무</h4>
                <ul>
                    <li style="margin-bottom: 10px;"><strong>픽업 스토리 컨텐츠:</strong>
                        <ul style="margin-top: 5px;">
                            <li>신규 캐릭터 출시 시 감정적 연결이 없으면 결제 전환율이 낮아짐</li>
                            <li>픽업 기간 한정으로 캐릭터 전용 스토리 컨텐츠를 설계하여 서사 체험 후 자연스럽게 결제 유도</li>
                            <li>캐릭터 애착도 강화로 픽업 기간 내 결제 전환율 향상, 희소성 효과도 동시에 확보</li>
                        </ul>
                        <img src="assets/WAROFCROWN/워오크1.png" class="modal-inline-img" alt="픽업 캐릭터 컨텐츠 기획서">
                    </li>
                    <li style="margin-bottom: 10px;"><strong>보스 레이드:</strong>
                        <ul style="margin-top: 5px;">
                            <li>수집형 RPG는 PvE 중심이라 유저 간 경쟁 요소가 없으면 장기 체류 동기가 약해짐</li>
                            <li>보스 레이드에 랭킹 경쟁 구조를 도입하고 누적 데미지 기반 실시간 순위 시스템으로 설계</li>
                            <li>상위 랭크를 목표로 한 반복 도전 유도, 전투력 강화 필요성 인식으로 성장 과금 동기 형성</li>
                        </ul>
                        <img src="assets/WAROFCROWN/워오크2.png" class="modal-inline-img" alt="보스레이드 기획서 및 테이블">
                    </li>
                    <li style="margin-bottom: 10px;"><strong>일일 초기화 던전:</strong>
                        <ul style="margin-top: 5px;">
                            <li>고정 난이도 던전은 라이트 유저에겐 진입 장벽, 헤비 유저에겐 단순 반복이 되어 양쪽 모두 이탈</li>
                            <li>유저가 직접 난이도를 선택하는 구조로 설계하고 난이도별 보상을 차등화</li>
                            <li>라이트/헤비 유저를 동시에 포용하여 일일 콘텐츠 참여율 안정적 유지</li>
                        </ul>
                        <img src="assets/WAROFCROWN/워오크3.png" class="modal-inline-img" alt="일일 초기화 컨텐츠 기획서">
                    </li>
                </ul>
            `
        },
        "slashheavens": {
            title: "천지를베다",
            role: "메인 기획",
            image: "assets/proj_slash_heavens.png",
            content: `
                <p><strong>기간:</strong> 2015.08 ~ 2016.11</p>
                <div style="margin-top: 10px; margin-bottom: 10px;">
                    <span class="badge">#Dev</span>
                    <span class="badge">#Global</span>
                    <span class="badge">#Live</span>
                    <span class="badge">#UNITY</span>
                    <span class="badge">#삼국지</span>
                    <span class="badge">#수집형RPG</span>
                </div>
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.1);">
                <h4 style="color: #fff; margin-bottom: 10px;">1. 프로젝트 개요</h4>
                <ul style="margin-bottom: 20px;">
                    <li><strong>핵심 컨셉:</strong> 삼국지 IP를 활용한 수집형 RPG & 핵앤슬래시 전투</li>
                    <li><strong>주요 타겟:</strong> 삼국지 IP에 익숙한 4,50대 남성 유저</li>
                    <li><strong>주요 성과:</strong> 국내 구글 마켓 5위, 대만 런칭</li>
                </ul>
                <h4 style="color: #fff; margin-bottom: 10px;">2. 주요 담당 업무</h4>
                <ul>
                    <li style="margin-bottom: 10px;"><strong>전용 장비 시스템:</strong>
                        <ul style="margin-top: 5px;">
                            <li>캐릭터 수집 이후 PLC에 도달하면 추가 성장 동기가 없어 장기 이탈이 발생하는 문제가 있었음</li>
                            <li>캐릭터별 전용 장비를 설계하여 보유 시 특수 능력치와 고유 스킬이 부여되며, 장비에도 캐릭터 성장과 동일한 초월 시스템을 적용해 별도 과금 구조를 추가</li>
                            <li>캐릭터 수집 → 전용 장비 획득 → 초월 강화로 이어지는 복합 BM 사이클이 구축되어 장기 과금 동기 강화</li>
                        </ul>
                        <img src="assets/천지를베다/천베1.png" class="modal-inline-img" alt="전용 장비 UI 및 기획서">
                    </li>
                    <li style="margin-bottom: 10px;"><strong>정예 돌격:</strong>
                        <ul style="margin-top: 5px;">
                            <li>스토리 콘텐츠 소진 이후 자신의 성장이 어느 수준인지 확인할 수 있는 상시 콘텐츠 기획</li>
                            <li>무한 웨이브 구조로 설계 유저가 스스로 얼마나 많은 전투를 이어갈 수 있는지 직접 검증</li>
                            <li>멀리 진행할수록 보상이 증가하는 구조로 도전 동기 부여, 지속적인 성장 투자와 반복 도전이 맞물리는 상시 콘텐츠로 정착</li>
                        </ul>
                    </li>
                    <li style="margin-bottom: 10px;"><strong>레벨 디자인:</strong>
                        <ul style="margin-top: 5px;">
                            <li>전투 몰입감을 위한 적 밀도·이동 경로·지형 기믹을 통합 설계</li>
                            <li>직접 플레이 테스트를 반복하여 전투 흐름과 체감 몰입도를 검증</li>
                            <li>전투가 끊기지 않는 맵 구조를 완성, 출시 후 전투 만족도 측면에서 긍정적 유저 반응 확인</li>
                        </ul>
                        <img src="assets/천지를베다/천베2.png" class="modal-inline-img" alt="배경 컨셉 및 레벨 디자인 기획서">
                    </li>
                </ul>
            `
        },
        "guardians": {
            title: "가디언즈",
            role: "메인 기획",
            image: "assets/proj_guardians.png",
            content: `
                <p><strong>기간:</strong> 2014.04 ~ 2015.08</p>
                <div style="margin-top: 10px; margin-bottom: 10px;">
                    <span class="badge">#Dev</span>
                    <span class="badge">#UNITY</span>
                    <span class="badge">#수집형RPG</span>
                </div>
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.1);">
                <h4 style="color: #fff; margin-bottom: 10px;">1. 프로젝트 개요</h4>
                <ul style="margin-bottom: 20px;">
                    <li><strong>핵심 컨셉:</strong> 12지신을 컨셉으로 한 수집형 RPG</li>
                    <li><strong>주요 타겟:</strong> 2,30대 모바일 게임 유저</li>
                </ul>
                <h4 style="color: #fff; margin-bottom: 10px;">2. 주요 담당 업무</h4>
                <ul>
                    <li style="margin-bottom: 10px;"><strong>보스 레이드:</strong>
                        <ul style="margin-top: 5px;">
                            <li>수집형 RPG에서 캐릭터 획득 동기가 명확하지 않으면 수집 욕구가 희석되고 BM 사이클이 약해짐</li>
                            <li>속성별 전담 보스를 제작해 해당 속성 캐릭터의 강점이 극대화되는 전투 구조로 설계하고 난이도별 보상 체계를 함께 구성</li>
                            <li>솔로 플레이 진입 장벽 완화를 위한 친구 캐릭터 사용 시스템을 추가하여 수집-도전-보상의 반복 사이클 형성</li>
                        </ul>
                        <img src="assets/가디언즈/가디언즈1.png" class="modal-inline-img" alt="보스레이드 기획서 및 테이블">
                    </li>
                    <li style="margin-bottom: 10px;"><strong>속성 재료 파밍 던전:</strong>
                        <ul style="margin-top: 5px;">
                            <li>성장 경로가 불명확하면 유저가 어디서 무엇을 해야 하는지 몰라 이탈이 발생</li>
                            <li>속성별로 전담 파밍 던전을 분리 설계</li>
                            <li>각 던전의 역할을 명확히 하고 육성 중인 캐릭터에 따라 플레이 동선이 자연스럽게 형성되도록 구성</li>
                            <li>유저가 육성 목표에 맞는 던전을 직관적으로 선택, 동기부여된 반복 플레이 패턴으로 장기 체류에 기여</li>
                        </ul>
                    </li>
                </ul>
            `
        }
    };

    const projectCards = document.querySelectorAll('.project-card');
    const modalOverlay = document.getElementById('projectModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalRole = document.getElementById('modalRole');
    const modalImage = document.getElementById('modalImage');
    const modalText = document.getElementById('modalText');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectData[projectId];
            
            if (data) {
                modalTitle.textContent = data.title;
                modalRole.textContent = data.role;
                modalImage.src = data.image;
                modalText.innerHTML = data.content;
                
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the content
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
});
