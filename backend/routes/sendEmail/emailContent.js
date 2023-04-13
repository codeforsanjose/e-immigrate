const emailContents = {
    en: {
        red: `Thank you for completing all questions for the upcoming Citizenship Day 2023 event. Unfortunately, your case appears too complex and we will give priority to those who have qualified. Your phone information will be given to our staff and they will contact you by phone first. Our staff will attempt to contact you two times. You may receive a call in the first half of June 2023. We expect many applicants, so it may take one week or more before you receive a call
If you do not wish to wait, please visit <a href="https://www.e-immigrate.info/partners/santa-clara-county-immigration-legal-services-referral-list/">SANTA CLARA COUNTY IMMIGRATION LEGAL SERVICES LIST</a>, select an agency and contact them to make an appointment - the services you choose may not be free and are not part of Citizenship Day 2023 event.
Due to limited space, we cannot guarantee that you will receive services.
Thank you for your cooperation, patience, and understanding.
Sincerely, 
PROJECT NEW CITIZEN
`,
        green: (sessionTime) => `REGISTRATION NUMBER: CD 02020301
<br /><br />
THIS IS YOUR TICKET. PLEASE BE PREPARED TO SHOW THIS CONFIRMATION EMAIL AT THE EVENT. WITHOUT THIS EMAIL, YOU WILL NOT BE ALLOWED INSIDE. NO EXCEPTIONS.
<br /><br />
Please bring a mask.
<br /><br />
Parking $3
<br /><br />
Thank you for completing all questions for the upcoming Citizenship Day 2023 event. Congratulations, you have qualified to participate! 
<br /><br />
YOUR APPOINTMENT DETAILS:
<br /><br />
DATE: SATURDAY, APRIL 29,2023
APPOINTMENT TIME: ${sessionTime}
<br /><br />
San Jose City College
2100 Moorpark Ave.
San Jose, CA 95126
<br /><br />
PLEASE BRING WITH YOU YOUR GREEN CARD!
<br /><br />
AND CLICK ON THE <a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/"> LIST OF DOCUMENTS WHICH ARE REQUIRED TO APPLY</a>
<br /><br />
To minimize the risk of exposure and transfer of COVID-19, for your safety, our staff, and all of the families, please follow these easy steps:
<br /><br />
<ul>
<li>Stay at home if you are not feeling well</li>
<li>Use a mask when inside the building</li>
<li>Attend the event alone if you are capable</li>
<li>If you need assistance please come with only one other person to help you</li>
</ul>
THIS INVITATION IS FOR YOU ONLY. IT IS NOT TRANSFERABLE. EACH PERSON MUST COMPLETE THE VIDEO, QUESTIONNAIRE AND QUALIFY IN ORDER TO BE INVITED.
<br /><br />
Due to limited space, we cannot guarantee that you will receive services.
<br /><br />
Thank you for your cooperation, patience, and understanding.
<br /><br />
Sincerely,
<br /><br />
PROJECT NEW CITIZEN
`,
    },
    es: {
        red: `Gracias por completar todas las preguntas para el Día de la Ciudadanía del 2023. Desafortunadamente, su caso parece demasiado complejo y le daremos prioridad a los que calificaron. Su información será compartida con nuestro personal y ellos intentarán comunicarse por teléfono con usted dos veces.
<br /><br />Es posible que reciba una llamada durante las primeras dos semanas de junio del 2023. Esperamos muchos solicitantes, por lo que puede tomar hasta una semana antes de recibir una llamada.
<br /><br />Si no desea esperar, visite, <a href="http://bit.ly/SCCreferralSPANISH" >http://bit.ly/SCCreferralSPANISH</a>, seleccione una agencia y comuníquese con ellos para programar una cita; es posible que los servicios que elija tengan algún costo y no forman parte del evento, Día de la Ciudadanía del 2023.
<br /><br />Debido al espacio limitado y al COVID-19, no podemos garantizar que recibirá los servicios.
<br /><br />
Gracias por su cooperación, paciencia y comprensión.
<br /><br />
Atentamente,
<br /><br />
PROYECTO NUEVO CIUDADANO
`,
        green: (sessionTime) => `NÚMERO DE REGISTRO: CD 02020302
<br /><br />
ESTE ES SU BOLETO. POR FAVOR ESTÉ PREPARADO PARA MOSTRAR ESTE CORREO ELECTRÓNICO DE CONFIRMACIÓN DURANTE EL EVENTO. SIN ESTE CORREO ELECTRÓNICO, NO SE LE PERMITIRÁ ENTRAR. NO EXCEPCIONES.
<br /><br />
Por favor traiga una máscara.
<br /><br />
Estacionamento $3
<br /><br />
Gracias por responder a todas las preguntas para el taller Del Día de Ciudadanía 2023. ¡Felicidades, está calificado para participar!
<br /><br />
DETALLES DE SU CITA:
<br /><br />
FECHA: SÁBADO 29 DE ABRIL 2023
<br /><br />
HORA DE LA CITA: ${sessionTime}
<br /><br />
Colegio de la ciudad de San José
<br /><br />
2100 Moorpark Ave.
<br /><br />
San José, CA 95126
<br /><br />

¡POR FAVOR TRAIGA SU TARJETA VERDE!
<br /><br />
Y HAGA CLIC EN <a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-espanol/">LA LISTA DE DOCUMENTOS QUE SE REQUIEREN PARA APLICAR</a>
<br /><br />
Para minimizar el riesgo de exposición y transferencia de COVID-19, para su seguridad, nuestro personal y todas las familias, siga estos pasos sencillos:
<br /><br />
<ul>
<li>Quédese en casa si no se siente bien</li>
<li>Use una máscara cuando esté dentro del edificio</li>
<li>Asista al evento solo, si es capaz</li>
<li>Si necesita ayuda, venga con solo otra persona para ayudarlo</li>
</ul>
<br /><br />
ESTA INVITACIÓN ES SOLO PARA USTED. NO ES TRANSFERIBLE. CADA PERSONA DEBE COMPLETAR EL VIDEO, EL CUESTIONARIO Y CALIFICAR PARA SER INVITADO.
<br /><br />
Debido al espacio limitado, no podemos garantizar que recibirá servicios.
<br /><br />
Gracias por su cooperación, paciencia y comprensión.
<br /><br />
Atentamente,
<br /><br />
PROYECTO NUEVO CIUDADANO
`,
    },
    vi: {
        red: `Không đủ điều kiện cho các dịch vụ<br /><br />
        Cảm ơn bạn đã hoàn thành tất cả các câu hỏi cho Ngày nhập tịch 2023 sắp tới. Rất tiếc, trường hợp của bạn có vẻ quá phức tạp và chúng tôi sẽ ưu tiên những người đủ điều kiện. Thông tin điện thoại của bạn sẽ được cung cấp cho nhân viên của chúng tôi và họ sẽ liên hệ với bạn qua điện thoại trước. Nhân viên của chúng tôi sẽ cố gắng liên hệ với bạn hai lần. Bạn có thể nhận được cuộc gọi vào nửa đầu tháng 6 năm 2023. Sẽ có nhiều người nộp đơn, vì vậy có thể mất một tuần trước khi bạn nhận được cuộc gọi.
<br /><br />
Nếu bạn không muốn đợi, vui lòng truy cập <a href="http://bit.ly/SCCreferralVIETNAMESE" >http://bit.ly/SCCreferralVIETNAMESE</a>, chọn một cơ quan và liên hệ với họ để đặt lịch hẹn - các dịch vụ bạn chọn có thể không miễn phí và không nằm trong Ngày Nhập tịch năm 2023.

<br /><br />
Do vì chỗ có giới hạn, chúng tôi không thể đảm bảo rằng bạn sẽ nhận được dịch vụ.
<br /><br />
Cảm ơn bạn đã hợp tác, kiên nhẫn và thông cảm.
<br /><br />
Thân mến,
Project New Citizen
`,
        green: (sessionTime) => `SỐ ĐĂNG KÝ: CD 02020303
<br /><br />
Đ Y LÀ VÉ CỦA BẠN. VUI LÒNG CHUẨN BỊ ĐỂ TRÌNH BÀY EMAIL XÁC NHẬN NÀY TẠI SỰ KIỆN. KHÔNG CÓ EMAIL NÀY, BẠN SẼ KHÔNG ĐƯỢC PHÉP VÀO TRONG. KHÔNG CÓ NGOẠI LỆ.
<br /><br />
Vui lòng mang theo khẩu trang
<br /><br />
ĐỖ XE $3
<br /><br />
Cảm ơn bạn đã hoàn thành tất cả các câu hỏi cho Ngày nhập tịch 2023 sắp tới. Xin chúc mừng, bạn đã đủ điều kiện để tham gia!
<br /><br />
CHI TIẾT HẸN GẶP CỦA BẠN:
<br /><br />
NGÀY: THỨ BẢY, NGÀY 29 THÁNG 4 NĂM 2023
GIỜ HẸN: ${sessionTime}
<br /><br />

Cao đẳng thành phố San Jose
<br /><br />
2100 Moorpark Ave.
<br /><br />
San Jose, CA 95126
<br /><br />

HÃY MANG THEO THẺ XANH CỦA BẠN!
<br /><br />
VÀ BẤM VÀO DANH SÁCH CÁC GIẤY TỜ CẦN THIẾT
<br /><br />
<a href="https://www.e-immigrate.info/citizenship/tieng-viet/">LIST OF BASIC DOCUMENTS WHICH ARE REQUIRED TO APPLY</a>
<br /><br />

Để giảm thiểu nguy cơ phơi nhiễm và truyền nhiễm COVID-19, vì sự an toàn của bạn, nhân viên của chúng tôi và tất cả các gia đình, vui lòng làm theo các bước đơn giản sau:
<ul>
<li>Ở nhà nếu bạn cảm thấy không khỏe</li>
<li>Sử dụng khẩu trang khi vào bên trong tòa nhà</li>
<li>Tham dự sự kiện một mình nếu bạn có khả năng</li>
<li>Nếu bạn cần hỗ trợ, vui lòng chỉ đi cùng với một người khác để giúp bạn</li>
<br /><br />
LỜI MỜI NÀY CHỈ DÀNH CHO BẠN. NÓ KHÔNG THỂ CHUYỂN NHƯỢNG ĐƯỢC. MỖI NGƯỜI PHẢI HOÀN THÀNH VIDEO, BẢNG C U HỎI VÀ ĐỦ ĐIỀU KIỆN ĐỂ ĐƯỢC MỜI.
<br /><br />
Do vì chỗ có giới hạn, chúng tôi không thể đảm bảo rằng bạn sẽ nhận được dịch vụ.
<br /><br />
Cảm ơn bạn đã hợp tác, kiên nhẫn và thông cảm.
<br /><br />
Thân mến,
<br /><br />
Project New Citizen

`,
    },
    // Mandarin
    cmn: {
        red: `谢谢您回答有关即将举行的2023年公民日活动的问卷里所有的问题。不好意思，您的个案看来太复杂。我们会优先处理那些符合资格的人士。您的电话号码会交给我们的员工，他们将会先打电话和您联系。我们的员工会尝试两次和您联络。您可能在2023年6月上半月收到电话。我们期待会有很多申请人，所以您有可能需时至少一周才能收到我们的电话。


如果您不想等待，请浏览 <a href="http://bit.ly/SCCreferralMANDARIN">http://bit.ly/SCCreferralMANDARIN</a>，选择一个机构，与他们联络并预约 -- 您选择的服务未必是免费的，并且也不是2023年公民日的活动范围。
<br /><br />
由于名额有限，我们不能够保证您将会获得服务。
<br /><br />
谢谢您的合作，耐心，和谅解。
<br /><br />
新公民计划 敬上
`,
        green: (sessionTime) => `登记号码: CD 02020304
        <br /><br />
这是您的门票。出席此活动时请准备出示这份确认的电子邮件。没有此电子邮件，您将不会获准入场，恕无例外。
<br /><br />
请带好口罩。
<br /><br />
停车 $3
<br /><br />

谢谢您回答即将举行的2023年公民日活动的问卷里所有的问题。恭喜您！您有资格参与此活动。
<br /><br />
您的预约细节:
<br /><br />
日期: 2023年4月29日星期六
<br /><br />
预约时间: ${sessionTime}

<br /><br />
San Jose City College 圣荷西城市学院
<br /><br />
2100 Moorpark Ave.
<br /><br />
San Jose, CA 95126
<br /><br />

请带备您的绿卡!
<br /><br />
并点击 <a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/">申请所需文件及资料</a>
<br /><br />

为了减低传播及感染新型冠状病毒的风险，为了保障您、我们员工、所有家庭及所有其他处于不同健康状态的参加者的安全，也为了互相尊重和关怀，敬请您遵从这些简易步骤：
<ul>
<li>如您感到不适，请留在家里。</li>
<li>在室内请戴口罩。</li>
<li>如果您有能力的话，请独自出席此活动。</li>
<li>如果您需要援助，请只带另外一个人来帮助您。</li>
<li>此邀请只是为您而设，不能把它转让给他人。每个人必须观看视频，填妥甄别问卷，及符合资格才能获邀请。</li>
</ul>
<br /><br />
由于名额有限，我们不能够保证您将会获得服务。
<br /><br />
谢谢您的合作，耐心，和谅解。
<br /><br />
新公民计划 敬上

`,
    },
    //CANTONESE
    yue: {
        red: `谢谢您回答有关即将举行的2023年公民日活动的问卷里所有的问题。不好意思，您的个案看来太复杂。我们会优先处理那些符合资格的人士。您的电话号码会交给我们的员工，他们将会先打电话和您联系。我们的员工会尝试两次和您联络。您可能在2023年6月上半月收到电话。我们期待会有很多申请人，所以您有可能需时至少一周才能收到我们的电话。


如果您不想等待，请浏览 <a href="http://bit.ly/SCCreferralMANDARIN">http://bit.ly/SCCreferralMANDARIN</a>，选择一个机构，与他们联络并预约 -- 您选择的服务未必是免费的，并且也不是2023年公民日的活动范围。
<br /><br />
由于名额有限，我们不能够保证您将会获得服务。
<br /><br />
谢谢您的合作，耐心，和谅解。
<br /><br />
新公民计划 敬上
`,
        green: (sessionTime) => `登记号码: CD 02020304
        <br /><br />
这是您的门票。出席此活动时请准备出示这份确认的电子邮件。没有此电子邮件，您将不会获准入场，恕无例外。
<br /><br />
请带好口罩。
<br /><br />
停车 $3
<br /><br />

谢谢您回答即将举行的2023年公民日活动的问卷里所有的问题。恭喜您！您有资格参与此活动。
<br /><br />
您的预约细节:
<br /><br />
日期: 2023年4月29日星期六
<br /><br />
预约时间: ${sessionTime}

<br /><br />
San Jose City College 圣荷西城市学院
<br /><br />
2100 Moorpark Ave.
<br /><br />
San Jose, CA 95126
<br /><br />

请带备您的绿卡!
<br /><br />
并点击 <a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/">申请所需文件及资料</a>
<br /><br />

为了减低传播及感染新型冠状病毒的风险，为了保障您、我们员工、所有家庭及所有其他处于不同健康状态的参加者的安全，也为了互相尊重和关怀，敬请您遵从这些简易步骤：
<ul>
<li>如您感到不适，请留在家里。</li>
<li>在室内请戴口罩。</li>
<li>如果您有能力的话，请独自出席此活动。</li>
<li>如果您需要援助，请只带另外一个人来帮助您。</li>
<li>此邀请只是为您而设，不能把它转让给他人。每个人必须观看视频，填妥甄别问卷，及符合资格才能获邀请。</li>
</ul>
<br /><br />
由于名额有限，我们不能够保证您将会获得服务。
<br /><br />
谢谢您的合作，耐心，和谅解。
<br /><br />
新公民计划 敬上

`,
    },
    //Korean
    kor: {
        red: `다가오는 2023년 시민의 날 행사에 대한 모든 질문을 완료해 주셔서 감사합니다. 유감스럽게도 귀하의 사건은 너무 복잡해 보이며, 우리는 자격이 있는 사람들에게 우선권을 줄 것입니다. 당신의 전화 정보는 우리 직원에게 전달될 것이고, 그들은 먼저 전화로 당신에게 연락할 것입니다. 우리 직원이 당신에게 두 번 연락을 시도할 것입니다. 2023년 6월 상반기에 전화를 받으실 수 있습니다. 신청자가 많을 것으로 예상되므로, 전화를 받기까지 1주일 정도 걸릴 수 있습니다.
<br /><br />기다리지 않으려면 <a href="http://bit.ly/SCCreferralKOREAN">http://bit.ly/SCCreferralKOREAN</a> 방문하여 기관을 선택한 후 그들에게 연락하여 약속을 잡으십시오. 선택한 서비스는 무료가 아닐 수 있으며 2023년 시민의 날 행사에 포함되지 않을 수 있습니다.
<br /><br />
제한된 공간으로 인해 서비스를 받을 수 있다고 보장할 수 없습니다.
<br /><br />
여러분의 협조, 인내, 이해에 진심으로 감사드립니다.
<br /><br />
신규 시민 프로젝트
`,
        green: (sessionTime) => `등록 번호: CD 02020300
<br /><br />
이것은 당신의 티켓입니다. 이벤트에서 이 확인 이메일을 보여줄 준비를 하십시요.
<br /><br />
이 이메일이 없으면 안으로 들어올 수 없습니다. 예외 없음.
<br /><br />

마스크를 지참해주세요.
<br /><br />

주차 $3
<br /><br />

다가오는 2023 시민권의 날 행사에 대한 모든 질문을 완료해 주셔서 감사합니다. 축하합니다, 참가 자격이 있습니다! 
<br /><br />

예약 세부 정보:
<br /><br />

날짜: 2023년 4월 29일 토요일
<br /><br />
예약 시간:${sessionTime}
<br /><br />
San Jose City College
<br /><br />
2100 Moorpark Ave.
<br /><br />
San Jose, CA 95126
<br /><br />

영주권을 가지고 가십시오!
<br /><br />
신청해야 하는 <a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/">서류 목록을 클릭하세요.</a>
<br /><br />
COVID-19의 노출 및 전파 위험을 최소화하고 귀하의 안전, 직원 및 모든 가족을 위해 다음의 간단한 단계를 따르십시오.
<br /><br />
<ul>
<li>몸이 안 좋으면 집에 있어 주세요.</li>
<li>건물 안에서는 마스크를 착용해주세요.</li>
<li>당신이 가능하다면 혼자 행사에 참석해주세요.</li>
<li>도움이 필요하면 다른 한 사람과 함께 와서 도와주세요.</li>
</ul>
<br /><br />
이 초대는 오직 당신만을 위한 것입니다. 양도할 수 없습니다. 초대를 받으려면 각 사용자가 비디오, 설문지를 작성하고 자격을 갖추어야 합니다.
<br /><br />
제한된 공간으로 인해 귀하가 서비스를 받을 수 있다고 보장할 수 없습니다.
<br /><br />
여러분의 협조, 인내, 이해에 진심으로 감사드립니다.
<br /><br />
신규 시민 프로젝트
`,
    },
    tl: {
        red: `Salamat po sa pagkumpleto ng lahat ng mga katanungan para sa darating na kaganapang Araw ng Pagkamamayan 2023. Sa kasamaang palad, ang iyong kaso ay masyadong kumplikado. Binibigyan po namin ng priyoridad ang mga may kwalipikado aplikante. Ibibigay po namin ang inyong telepono sa aming staff para makipag-ugnay sila sa inyo sa telepono. 
<br />Susubukan po ng aming mga staff na makipag-ugnay sa iyo ng dalawang beses. Maaari po kayong makatanggap ng isang tawag sa ika-dalawang linggo Hunyo 2023. Inaasahan po namin na maraming mga aplikante, kaya't maaaring tumagal ng hanggang isang linggo bago kayo makatanggap ng tawag.
<br /><br />
Kung hindi po ninyong nais na maghintay, mangyaring bisitahin po ninyo ang <a href="http://bit.ly/SCCreferralTAGALOG">http://bit.ly/SCCreferralTAGALOG</a>. Pumili kayo ng isang ahensya at makipag-ugnay po sa kanila upang gumawa ng isang appointment - ang mga serbisyong pinili ninyo ay maaaring hindi libre at hindi bahagi ng Citizenship Day 2023 event.
<br /><br />
Dahil sa aming  limitadong kakayahan sa panahong ngayong, hindi po namin masisiguro na makakatanggap kayo ng mga serbisyo.

<br /><br />
Salamat po sa iyong kooperasyon, pasensya, at pag-unawa.
<br /><br />
Taos-puso,
<br /><br />
PROJECT NEW CITIZEN
`,
        green: (sessionTime) => `REGISTRATION NUMBER: CD 02020306
<br /><br />
ITO PO ANG INYONG TICKET. IPAKITA ANG EMAIL CONFIRMATION NA ITO SA EVENT. KUNG WALA ANG EMAIL NA ITO, HINDI KAYO PAPAYAGAN NA PUMASOK SA LOOB. WALANG PONG EXCEPTIONS."
<br /><br />
Mangyaring magdala ng maskara.
<br /><br />
Paradahan $3
<br /><br />
Salamat po sa inyong pagsagot sa lahat ng mga tanong para sa paparating na Citizenship Day 2023. Kwalipikado kayong lumahok. Binabati po namin kayo!
<br /><br />
IYONG MGA DETALYE NG APPOINTMENT:
<br /><br />
PETSA:  SABADO, ABRIL 29, 2023
<br /><br />
ORAS NG APPOINTMENT: ${sessionTime}
<br /><br />

San Jose City College 2100 Moorpark Ave.
<br /><br />
San Jose, CA 95126
<br /><br />
DALHIN PO NINYO ANG INYONG GREEN CARD!
<br /><br />
AT MAG-CLICK <a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/">SA LISTAHAN NG MGA DOKUMENTO NA KAILANGANG MAG-APPLY LIST OF DOCUMENTS WHICH ARE REQUIRED TO APPLY</a>
<br /><br />
Upang mabawasan ang panganib ng pagkakalantad at paglipat ng COVID-19, para sa iyong kaligtasan, sa aming mga staff, at sa lahat ng pamilya, mangyaring sundin po ang mga madaling hakbang na ito:
<ul>
<li>Manatili sa bahay kung masama ang pakiramdam ninyo. </li>
<li>Gumamit ng maskara kapag nasa loob ng gusali</li>
<li>Dumalo sa kaganapan nang walang kasama kung kaya ninyo.</li 
<li>Kung kailangan ninyo ng tulong, mangyaring sumama na may kasama lamang na isang tao upang tumulong sa iyo</li>
</ul>


Dahil sa limitadong espasyo, hindi namin magagarantiya na makakatanggap kaYO ng mga serbisyo.
<br /><br />
Salamat po sa iyong kooperasyon, pasensya, at pang-unawa.
<br /><br />
Taos-puso,
<br /><br />
PROYEKTO BAGONG MAMAMAYAN

`,
    },
    am: {
        red: `መስፈርቱን ያላሟሉና በዚህ መርሃ ግብር መሳተፍ የማይችሉ ሰዎች (ቀይ ነጥብ)
        <br /><br />በ2023 ለሚደረገው የዜግነት መርሃ ግብር ለመሳተፍ የሚችሉትን ሰዎች ለማጣራት የቀረቡትን ጥያቄወች በሙሉ በመመለስዎ በጣም እናመሰናለን፡፡ በመርሃ ግብሩ ለመሳተፍ ጉዳይዎ በጣም የተወሳሰበ ሆኖ ስላገኘነው ብቁ ሆነው ላገኘናቸው እጩዎች ቅድሚያ የምንሰጥ መሆኑን ስንገልፅልዎ እናዝናለን፡፡ ለባልደረቦቻችን ስልክ ቁጥርዎን እንሰጣቸውና ደውለው ያናግሩዎታል፡፡በመጀምሪያው የስልክ ጥሪ ካለገኘንዎ ለሁለተኛ ጊዜ ደውለን ልናገኝዎት እንሞክራለን፡፡ በግሪጎሪሲዮን የዘመን አቆጣጠር በያዝነው አመት በ2023 በስድስተኛው ወር አጋማሺ ወይንም (በJune አጋማሺ) ላይ እንደውልለዎታለን፡፡ የአመልካቾች ቁጥር በርከት ሊል ስለሚችል ደውሎ ለማናገር ከአንድ ሳምንት በላይ ሊወስድብን ይችል ይሆናል፡፡ 

        <br /><br />የእኛን የስልክ ጥሪ መጠበቅ ካልፈቀዱ እባክዎን ይህን አስፈንጣሪ ይጫኑና <a href="http://bit.ly/SCCreferralAMHARIC">http://bit.ly/SCCreferralAMHARIC</a>, ከተዘረዘሩት ድርጅቶች ውስጥ መርጠው በመደወል ቀጠሮ ይያዙ፡፡ የተዘረዘሩት ድርጅቶችና የሚሰጡት አገልግሎት ነፃ ላይሆን ይችላል በተጨማሪም የ2023  የዜግነት ቀን መርሃ ግብር አካልም አይደለም፡፡ 

        <br /><br />በአለብን የአቅም ውስንነት ምክንያት በእርግጠኝነት አገልግሎቱን ያገኛሉ ብለን ማረጋገጫ መስጠት አይቻለንም፡፡
        <br /><br />ስለትብብርዎ ስለታጋሺነትዎና  ስለአስተዎይነትዎ እናመሰግናለን፡፡
        <br /><br />ከታላቅ አክብሮት ጋር
        <br /><br />የአዲስ ዜጎች ፕሮጀክት
`,
        green: (sessionTime) => `የምዝግባ ቁጥር: CD 02020307
        <br /><br />
ይህ የእርስዎ ትኬት ነው። ይህንን የማረጋገጫ ኢሜይል በዝግጅቱ ላይ ለማሳየት እባክዎ ይዘጋጁ። ይህ ኢሜይል ከሌለ፣ ወደ ውስጥ አይፈቀዱም። ምንም በስተቀር።
<br /><br />
እባክዎን ጭምብል ይዘው ይምጡ። 
<br /><br />
የመኪና ማቆሚያ $3
<br /><br />
በ2023 በሚደረገው የዜግነት መርሃ ግብር ላይ መሳተፍ የሚችሉትን ሰዎች ለማጣራት የቀረቡትን ጥያቄወች በሙሉ በመመለስዎ በጣም እናመሰናለን፡፡ በዚህ መርሃ ግብር ላይ ለመሳተፍ ብቁ ሆነው አግኝተንዎታል እንኳን ደስ ያለዎት ፡፡ 
<br /><br />
የቀጠሮዎ ዝርዝር ጉዳዮች
<br /><br />
ቀን: ቅዳሜ፣ ኤፕሪል 29 ቀን, 2023 ዓም
<br /><br />
የቀጠሮ ስዓት: ${sessionTime}
<br /><br />
አድራሻ: San Jose City College
<br /><br />
2100 Moorpark Ave.
<br /><br />
San Jose, CA 95126
<br /><br />

እባክዎን ወደ መርሃ ግብሩ በሚመጡ ጊዜ የመኖሪያ ፈቃድዎን (ግሪን ካርድዎን) ይዘው ይምጡ
<br /><br />
በተጨማሪ ይዘው መምጣት ያለብዎትን ሰነዶች ለመለየት ይህን አስፈንጣሪ ይጫኑ: <a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/"> LIST OF DOCUMENTS WHICH ARE REQUIRED TO APPLY </a>
<br /><br />

የኮቪድ ስርጭትን ለመቀነስ የርስዎን የሰራተኞቻችን እንዲሁም በመርሃ ግብሩ ላይ የሚሳተፉ ቤተሰቦችን ደህንነት ለማረጋገጥ እባክዎን የሚከትሉትን እርምጃዎች ይውሰዱ
<br /><br />
<ul>
<li>የህመም ስሜት ካለዎ ከቤት አይውጡ</li>
<li>በህንፃ ውስጥ በሚሆኑ ጊዜ ማስክ ወይንም የፊት ጭምብል ያድርጉ</li>
<li>የሚቻል ከሆነ ወደ መርሃ ግብሩ ለብቻዎ ይምጡ</li>
<li>እርዳታ የሚያስፈልግዎት ከሆነ ሊረዳዎት ከሚችል ከአንድ ሰው ጋር ብቻ ይምጡ</li>
</ul>

ይህ የመሳተፊያ ግብዣ ለዕርስዎ ብቻ ሲሆን ለሌላ ሰው የሚተላለፍ አይደለም በመርሃ ግብሩ ላይ ለመሳተፍ እያንዳንዱ ተሳታፊ ቪዲዮውን መምልከት መጠይቆችን መመለስና መስፈርቱን ማሟላት አለበት አለባት
<br /><br />

በአለብን የአቅም ውስንነት ምክንያት በእርግጠኝነት አገልግሎቱን ያገኛሉ ብለን ማረጋገጫ መስጠት አይቻለንም፡፡
<br /><br />
ስለትብብርዎ ስለታጋሺነትዎና  ስለአስተዎይነትዎ እናመሰግናለን፡፡
<br /><br />

ከታላቅ አክብሮት ጋር
<br /><br />
የአዲስ ዜጎች ፕሮጀክት
`,
    },
    hi: {
        red: `सेवाओं के लिए योग्य नहीं (रेड-डॉट)
<br /><br />
आगामी नागरिकता दिवस 2023 कार्यक्रम के लिए सभी प्रश्नों को पूरा करने के लिए धन्यवाद। दुर्भाग्य से, आपका मामला बहुत जटिल है और हम उन लोगों को प्राथमिकता देंगे जो योग्य हैं। आपके फोन की जानकारी हमारे कर्मचारियों को दी जाएगी और वे पहले आपसे फोन पर संपर्क करेंगे। हमारे कर्मचारी आपसे दो बार संपर्क करने का प्रयास करेंगे। आपको जून 2023 की पहली छमाही में एक कॉल प्राप्त हो सकती है। हम कई आवेदकों से अपेक्षा करते हैं, इसलिए आपको कॉल प्राप्त करने में एक सप्ताह तक का समय लग सकता है।
<br /><br />
यदि आप इंतजार नहीं करना चाहते हैं, तो कृपया सांता क्लारा काउंटी <a href="http://bit.ly/SCCreferralHINDI">http://bit.ly/SCCreferralHINDI</a> पर जाएं, एक एजेंसी का चयन करें और समय निर्धारित   करने के लिए उनसे संपर्क करें - आपके द्वारा चुनी गई सेवाएं मुफ्त नहीं हो सकती हैं और नागरिक दिवस 2023 event का हिस्सा नहीं हैं।
<br /><br />
सीमित स्थान के कारण, हम यह गारंटी नहीं दे सकते कि आपको सेवाएँ प्राप्त होंगी।
आपके सहयोग, धैर्य और समझ के लिए धन्यवाद।
<br /><br />
साभार,
<br /><br />
प्रोजेक्ट न्यू नागरिक 
`,
        green: (sessionTime) => `Registration Number: CD 02020308
<br /><br />
यहआपका टिकट है। कृपया इस पुष्टिकरण ईमेल को इवेंट में दिखाने के लिए तैयार रहें। इस ईमेल के बिना, आपको अंदर जाने की अनुमति नहीं दी जाएगी। कोई अपवाद नहीं.
<br /><br />
कृपया एक मुखौटा लाओ।.
<br /><br />
पार्किंग $3
<br /><br />
आगामी नागरिकता दिवस 2023 कार्यक्रम के लिए सभी प्रश्नों को पूरा करने के लिए धन्यवाद। बधाई हो, आप भाग लेने के लिए योग्य है!
<br /><br />
आपकी अपॉइंटमेंट डिटैल:
<br /><br />
DATE: शनिवार, अप्रैल 29, 2023
<br /><br />
APPOINTMENT TIME: ${sessionTime}
<br /><br />
सैन होज़े सिटी कॉलेज
<br /><br />
2100 मूरपार्क Ave.
<br /><br />
सैन होज़े, CA 95126
<br /><br />

कृपया अपने साथ अपना ग्रीन कार्ड लाएँ!
<br /><br />
और आवेदन करने के लिए आवश्यक दस्तावेजों की सूची पर क्लिक करें I
<br /><br />
<a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/">LIST OF DOCUMENTS WHICH ARE REQUIRED TO APPLY</a>
<br /><br />
आपकी सुरक्षा के लिए COVID-19 के जोखिम और स्थानांतरण के जोखिम को कम करने के लिए, स्वास्थ्य के विभिन्न स्तरों वाले अन्य सभी जो भाग लेंगे, हमारे कर्मचारी और सभी परिवार, चिंता से बाहर और पारस्परिक जोखिम और स्थानांतरण के जोखिम को कम करने के लिए COVID-19 आपकी सुरक्षा के लिए, स्वास्थ्य के विभिन्न स्तरों वाले अन्य सभी लोग, जो भाग लेंगे, हमारे कर्मचारी और सभी परिवार, चिंता और आपसी शिष्टाचार से बाहर कृपया इन आसान स्टैप का पालन करें:
<br /><br />
<ul>
<li>यदि आप अच्छा महसूस नहीं कर रहे हैं तो कृपया घर पर रहें।</li>
<li>बिल्डिंगके अंदर कृपया मास्क का उपयोग करें।</li>
<li>यदि आप सक्षम हैं तो कृपया अकेले कार्यक्रम में भाग लें</li>
<li>यदि आपको सहायता की आवश्यकता है तो कृपया आपकी सहायता के लिए केवल एक अन्य व्यक्ति के साथ आएं</li>
</ul>

सीमित स्थान के कारण, हम यह गारंटी नहीं दे सकते कि आपको सेवाएँ प्राप्त होंगी।
<br /><br />
आपके सहयोग, धैर्य और समझ के लिए धन्यवाद।
<br /><br />

साभार,
<br /><br />
प्रोजेक्ट न्यू नागरिक  
 
`,
    },
    pan: {
        red: `ਸੇਵਾਵਾਂ ਲਈ ਯੋਗ ਨਹੀਂ (ਲਾਲ  ਬਿੰਦੀ)
 <br /><br />ਆਉਣ ਵਾਲੇ ਸਿਟੀਜ਼ਨਸ਼ਿਪ ਡੇ 2023 ਸਮਾਗਮ ਲਈ ਸਾਰੇ ਪ੍ਰਸ਼ਨਾਂ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਤੁਹਾਡਾ ਧੰਨਵਾਦ।  ਬਦਕਿਸਮਤੀ ਨਾਲ, ਤੁਹਾਡਾ ਕੇਸ ਬਹੁਤ ਗੁੰਝਲਦਾਰ ਜਾਪਦਾ ਹੈ ਅਤੇ ਪਹਿਲਾਂ ਅਸੀਂ ਉਨ੍ਹਾਂ ਨੂੰ ਤਰਜੀਹ ਦੇਵਾਂਗੇ ਜਿਨ੍ਹਾਂ ਨੇ ਯੋਗਤਾ ਪੂਰੀ ਕੀਤੀ ਹੈ।  ਤੁਹਾਡੇ ਫੋਨ ਦੀ ਜਾਣਕਾਰੀ ਸਾਡੇ ਸਟਾਫ ਨੂੰ ਦਿੱਤੀ ਜਾਵੇਗੀ ਅਤੇ ਉਹ ਪਹਿਲਾਂ ਤੁਹਾਡੇ ਨਾਲ ਫੋਨ ਰਾਹੀਂ ਸੰਪਰਕ ਕਰਨਗੇ।  ਸਾਡਾ ਸਟਾਫ ਤੁਹਾਡੇ ਨਾਲ ਦੋ ਵਾਰ ਸੰਪਰਕ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੇਗਾ।  ਤੁਸੀਂ ਜੂਨ 2023 ਦੇ ਪਹਿਲੇ ਅੱਧ ਵਿੱਚ ਇੱਕ ਕਾਲ ਪ੍ਰਾਪਤ ਕਰ ਸਕਦੇ ਹੋ।  ਅਸੀਂ ਬਹੁਤ ਸਾਰੇ ਬਿਨੈਕਾਰਾਂ ਦੀ ਉਮੀਦ ਕਰਦੇ ਹਾਂ, ਇਸ ਲਈ ਤੁਹਾਡੇ ਦੁਆਰਾ ਇੱਕ ਕਾਲ ਪ੍ਰਾਪਤ ਹੋਣ ਵਿੱਚ ਇੱਕ ਹਫਤਾ ਲੱਗ ਸਕਦਾ ਹੈ.
ਜੇ ਤੁਸੀਂ ਇੰਤਜ਼ਾਰ ਨਹੀਂ ਕਰਨਾ ਚਾਹੁੰਦੇ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ <a href="http://bit.ly/SCCreferralPUNJABI">http://bit.ly/SCCreferralPUNJABI</a> ਵੇਖੋ, ਕਿਸੇ ਏਜੰਸੀ ਦੀ ਚੋਣ ਕਰੋ ਅਤੇ ਉਨ੍ਹਾਂ ਨਾਲ ਮੁਲਾਕਾਤ ਕਰਨ ਲਈ ਸੰਪਰਕ ਕਰੋ - ਜਿਹੜੀਆਂ ਸੇਵਾਵਾਂ ਤੁਸੀਂ ਚੁਣਦੇ ਹੋ ਉਹ ਮੁਫਤ ਨਹੀਂ ਹੋ ਸਕਦੀਆਂ ਅਤੇ ਨਾਗਰਿਕਤਾ ਦਿਵਸ 2023 ਦੇ ਹਿਸੇ ਦਾ ਹਿੱਸਾ ਨਹੀਂ ਹਨ। 
 <br /><br />
ਸੀਮਤ ਜਗ੍ਹਾ ਦੇ ਕਾਰਨ, ਅਸੀਂ ਗਰੰਟੀ ਨਹੀਂ ਦੇ ਸਕਦੇ ਕਿ ਤੁਸੀਂ ਸੇਵਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋਗੇ ਹੀ। 
 <br /><br />
ਤੁਹਾਡੇ ਸਹਿਯੋਗ, ਸਬਰ ਅਤੇ ਸਮਝ ਲਈ ਧੰਨਵਾਦ। 
 <br /><br />
ਸੁਹਿਰਦ,
<br /><br />
ਪ੍ਰਾਜੈਕਟ ਨਵਾਂ ਸਿਟੀਜ਼ਨ
`,
        green: (sessionTime) => `REGISTRATION NUMBER: CD 02020309
<br /><br />

ਇਹ ਤੁਹਾਡੀ ਟਿਕਟ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਇਵੈਂਟ 'ਤੇ ਇਹ ਪੁਸ਼ਟੀਕਰਨ ਈਮੇਲ ਦਿਖਾਉਣ ਲਈ ਤਿਆਰ ਰਹੋ। ਇਸ ਈਮੇਲ ਤੋਂ ਬਿਨਾਂ, ਤੁਹਾਨੂੰ ਅੰਦਰ ਜਾਣ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਦਿੱਤੀ ਜਾਵੇਗੀ। ਕੋਈ ਅਪਵਾਦ ਨਹੀਂ।
<br /><br />
ਕਿਰਪਾ ਕਰਕੇ ਮਾਸਕ ਲਿਆਓ।.
<br /><br />
ਪਾਰਕਿੰਗ $3
<br /><br />
ਆਗਾਮੀ ਸਿਟੀਜ਼ਨਸ਼ਿਪ ਡੇ 2023 ਈਵੈਂਟ ਲਈ ਸਾਰੇ ਸਵਾਲਾਂ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਤੁਹਾਡਾ ਧੰਨਵਾਦ। ਵਧਾਈਆਂ, ਤੁਸੀਂ ਭਾਗ ਲੈਣ ਦੇ ਯੋਗ ਹੋ!
<br /><br />
ਤੁਹਾਡੀ ਮੁਲਾਕਾਤ ਦੇ ਵੇਰਵੇ
<br /><br />
ਮਿਤੀ: ਸ਼ਨੀਵਾਰ, ਅਪ੍ਰੈਲ 29, 2023
<br /><br />
ਮੁਲਾਕਾਤ ਦਾ ਸਮਾਂ: ${sessionTime}
<br /><br />


ਸੈਨ ਜੋਸ ਸਿਟੀ ਕਾਲਜ
<br /><br />
2100 ਮੂਰਪਾਰਕ ਐਵੇਨਿਊ
<br /><br />
ਸੈਨ ਜੋਸ, CA 95126
<br /><br />
ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਗ੍ਰੀਨ ਕਾਰਡ ਆਪਣੇ ਨਾਲ ਲਿਆਓ!
<br /><br />

ਅਤੇ ਉਹਨਾਂ ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਸੂਚੀ <a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/">'ਤੇ ਕਲਿੱਕ ਕਰੋ ਜੋ ਅਪਲਾਈ ਕਰਨ ਲਈ ਲੋੜੀਂਦੇ ਹਨ</a>
<br /><br />

ਤੁਹਾਡੀ ਸੁਰੱਖਿਆ, ਸਾਡੇ ਸਟਾਫ਼ ਅਤੇ ਸਾਰੇ ਪਰਿਵਾਰਾਂ ਲਈ, ਕੋਵਿਡ-19 ਦੇ ਐਕਸਪੋਜਰ ਅਤੇ ਟ੍ਰਾਂਸਫਰ ਦੇ ਜੋਖਮ ਨੂੰ ਘੱਟ ਕਰਨ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ ਇਹਨਾਂ ਆਸਾਨ ਕਦਮਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ:
<br /><br />
<ul>
<li>ਜੇ ਤੁਸੀਂ ਠੀਕ ਮਹਿਸੂਸ ਨਹੀਂ ਕਰ ਰਹੇ ਹੋ ਤਾਂ ਘਰ ਰਹੋ</li>
<li>ਇਮਾਰਤ ਦੇ ਅੰਦਰ ਹੋਣ ਵੇਲੇ ਮਾਸਕ ਦੀ ਵਰਤੋਂ ਕਰੋ</li>
<li>ਜੇ ਤੁਸੀਂ ਸਮਰੱਥ ਹੋ ਤਾਂ ਇਕੱਲੇ ਸਮਾਗਮ ਵਿਚ ਸ਼ਾਮਲ ਹੋਵੋ</li>
<li>ਜੇਕਰ ਤੁਹਾਨੂੰ ਸਹਾਇਤਾ ਦੀ ਲੋੜ ਹੈ ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਲਈ ਸਿਰਫ਼ ਇੱਕ ਹੋਰ ਵਿਅਕਤੀ ਨਾਲ ਆਓ</li>
<ul>

ਇਹ ਸੱਦਾ ਸਿਰਫ਼ ਤੁਹਾਡੇ ਲਈ ਹੈ। ਇਹ ਟ੍ਰਾਂਸਫਰਯੋਗ ਨਹੀਂ ਹੈ। ਹਰ ਵਿਅਕਤੀ ਨੂੰ ਵੀਡੀਓ, ਪ੍ਰਸ਼ਨਾਵਲੀ ਨੂੰ ਪੂਰਾ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ ਅਤੇ ਸੱਦਾ ਦਿੱਤੇ ਜਾਣ ਲਈ ਯੋਗ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।
<br /><br />

ਸੀਮਤ ਥਾਂ ਦੇ ਕਾਰਨ, ਅਸੀਂ ਇਸ ਗੱਲ ਦੀ ਗਰੰਟੀ ਨਹੀਂ ਦੇ ਸਕਦੇ ਹਾਂ ਕਿ ਤੁਸੀਂ ਸੇਵਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋਗੇ। 
<br /><br />
ਤੁਹਾਡੇ ਸਹਿਯੋਗ, ਧੀਰਜ ਅਤੇ ਸਮਝ ਲਈ ਧੰਨਵਾਦ।
<br /><br />

ਸੁਹਿਰਦ,
<br /><br />

ਪ੍ਰਾਜੈਕਟ ਨਵਾਂ ਸਿਟੀਜ਼ਨ

`,
    },
    pt: {
        red: `Obrigado por responder a todas as perguntas para o evento Dia da Cidadania 2023.
<br /><br />
Infelizmente, seu caso parece ser mais complexo e nós daremos prioridade aqueles que se qualificaram. Seu telefone será passado ao nosso time e eles tentarão contata-lo duas vezes.
Espere receber nossa ligação na primeira quinzena de Junho de 2023. Como teremos muitos candidatos, poderá demorar um pouco mais  até que voce receba nossa ligação.
<br /><br />
Se não quiser esperar, visite a <a href="http://bit.ly/SCCreferralPORTUGUESE">http://bit.ly/SCCreferralPORTUGUESE</a>, e entre em contato com alguma  das agencias listadas neste website. Os serviços destas agências poderão não ser gratuitos e não fazem parte do evento Dia da Cidadania 2023.
<br /><br />
Obrigado pela sua cooperação, paciência e compreensão.
<br /><br />
Sinceramente,
<br /><br />
Projeto Novo Cidadão
`,
        green: (sessionTime) => `NUMERO DE REGISTRO: CD 02020310
<br /><br />
ESTE E O SEU TICKET. POR FAVOR, TENHA ESTE E-MAIL DE CONFIRMAÇÃO EM FACIL ACESSO PARA MOSTRA-LO NO DIA DO EVENTO. SEM ESTE E-MAIL, VOCÊ NÃO PARTICIPARA DO EVENTO. NÃO ABR
<br /><br />
Por favor, traga uma máscara.
<br /><br />
Estacionamento $3
<br /><br />
Obrigado por responder a todas as perguntas para o evento Dia da Cidadania 2023. 
<br /><br />
Parabéns, você se qualificou para participar!
<br /><br />
DETALHES DA SUA NOMEAÇÃO:
<br /><br />
DATA: SÁBADO, 29 DE ABRIL DE 2023
<br /><br />
HORÁRIO DE ENCONTRO: ${sessionTime}
<br /><br />



Colégio Municipal São José
<br /><br />
2100 Moorpark Ave.
<br /><br />
São José, CA 95126
<br /><br />

POR FAVOR, TRAGA SEU GREEN CARD! 
<br /><br />
E CLIQUE NA <a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/">LISTA DE DOCUMENTOS NECESSÁRIOS PARA CANDIDATAR-SE</a>
<br /><br />
Para minimizar o risco de exposição e transferência do COVID-19, para sua segurança, de nossa equipe e de todas as famílias, siga estas etapas simples:
<br /><br />
<ul>
<li>Fique em casa se não se sentir bem</li>
<li>Use máscara quando estiver dentro do prédio</li>
<li>Participe do evento sozinho, se puder</li>
<li>Se precisar de ajuda, venha com apenas mais uma pessoa para ajudá-lo.</li>
</ul>
ESTE CONVITE É SÓ PARA VOCÊ. NÃO É TRANSFERÍVEL. CADA PESSOA DEVE PREENCHER O VÍDEO, O QUESTIONÁRIO E SE QUALIFICAR PARA SER CONVIDADO.
<br /><br />
Devido ao espaço limitado, não podemos garantir que você receberá serviços.
<br /><br />
Obrigado por sua cooperação, paciência e compreensão.
<br /><br />

Sinceramente,
<br /><br />
NOVO PROJETO CIDADÃO

`,
    },
    fa: {
        red: `کسانی که واجد شرایط نیستند (گروه قرمز)
<br /><br />

از اینکه به کلیه ی سوالات Citizenship Day 2023 پاسخ دادید سپاسگزاریم. متاسفانه پرونده ی شما پیچیده است و ما اولویت را به آنهایی میدهیم که پرونده ی ساده ای دارند. شماره ی تماس شما به کارمندان ما داده خواهد شد و نخست تلاش خواهند کرد تا با شما تماس تلفنی بگیرند. آنها سعی خواهند کرد دو بار با شما تماس بگیرند. احتمالا نیمه ی اول ماه ژوئن سال ۲۰۲۲ با شما تماس می گیریم. بدلیل تعداد بالای متقاضیان ممکن است تماس ما با شما تا یک هفته به طول بینجامد. 
<br /><br />

چنانچه تمایلی به صبر کردن ندارید لطفا http://bit.ly/SCCreferralFARSI را مطالعه کرده و با یکی از سازمانهای موجود برای تعیین وقت مشاوره تماس بگیرید. ممکن است خدماتی که احتیاج دارید بخشی از برنامه ی Citizenship Day 2023 نبوده و رایگان نباشند.<br /><br />
<br /><br />
بدلیل ظرفیت محدود و ویروس کرونا ما نمیتوانیم تضمین کنیم که فرصت خدمت کردن به شما عزیزان را داشته باشیم
<br /><br />
از تعامل، صبر و درک شما سپاسگزاریم.
<br /><br />
با احترام،
<br /><br />
PROJECT NEW CITIZEN
`,
        green: (sessionTime) => `
این بلیت شماست. لطفا آماده باشید تا این ایمیل تاييديه را در  روز برنامه نشان دهید. بدون اين ايميل اجازه ی ورود به شما داده نمیشود.
<br /><br />
لطفا ماسک همراه داشته باشید
<br /><br />
پارکینگ 3 دلار
<br /><br />
از اینکه به کلیه ی سوالات Citizenship Day 2023 پاسخ دادید سپاسگزاریم. تبریک میگوییم، شما برای شرکت در این برنامه واجدشرایط هستید.
 <br /><br />

جزئیات وقت شما:
<br /><br />
زمان: شنبه، ۲۹ آوریل ۲۰۲۳
${sessionTime} ۲ بعد از ظهر
<br /><br />



<br /><br />سن خوزه سیتی کالج
2100 Moorpark Ave.
<br /><br />
San Jose, CA 95126
<br /><br />
لطفا گرین کارت خود را همراه داشته باشید. <br /><br />
و روی <a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/">لیست مدارکی که میبایست به همراه داشته باشید کلیک کنید</a>
<br /><br />

به منظور حفظ سلامت خود و سایرین لطفا اقدامات ساده ی زیر را برای به حداقل رساندن احتمال انتقال ویروس کووید ۱۹ انجام دهید. <br /><br />
<ul>
<li>اگر حالتان خوب نیست در خانه بمانید.</li>
<li>داخل ساختمان از ماسک استفاده کنید.</li>
<li>در صورت امکان بدون همراه در برنامه شرکت کنید.</li>
<li>اگر به کمک احتیاج دارید فقط یک نفر را بعنوان همراه با خود به برنامه بیاورید. </li>
</ul>
دعو‌تنامه فقط برای شماست و قابل انتقال به غیر نیست. هر نفر میبایست ویدیو را تماشا کرده و به سوالات پاسخ دهد تا در صورت واجدشرایط بودن به برنامه دعوت شود.

<br /><br />
بدلیل ظرفیت محدود ما نمیتوانیم تضمین کنیم که فرصت خدمت کردن به شما عزیزان را داشته باشیم.
<br /><br />
از تعامل، صبر و درک شما سپاسگزاریم.
<br /><br />
با احترام،
<br /><br />
PROJECT NEW CITIZEN

`,
    },
    ti: {
        red: ``,
        green: ``,
    },
    ar: {
        red: `شكرا لكم لاتمامكم جميع الأسئلة عن يوم المواطنة 2023. مع الاسف فان وضعكم معقد جدا ولذا سوف نعطي الأولوية للذين تأهلوا للمشاركة. وسوف نعطي معلومات تلفونكم لموظفينا وسوف يتصلوا عليك بالتلفون اولا. وسوف يحاول موظفينا الاتصال بك مرتين. وربما يتم الاتصال بكم فى للمرة الاولى في النصف الأول من شهر حزيران 2023. ونتوقع الكثير من الطلبات ولذلك ربما تأخذ أسبوعا قبل الاتصال 
        <br /><br />
ك.  
وإذا كنت لا ترغب في الانتظار، من فضلك ادخل على موقع http://bit.ly/SCCreferralARABIC وهناك اختار وكالة واتصل بهم لعمل موعد، وان الخدمات التي تطلبها ربما لا تكون مجانية وهي ليس جزأ من يوم المواطنة 2023. 
<br /><br />
وبسبب الأماكن المحدودة  لن نضمن أن نقدم لك خدمات. 

<br /><br />
شكرا لتعاونكم و صبركم وتفهمكم
<br /><br />
المخلص لكم 
<br /><br />
مشروع المواطن الجديد. 

`,
        green: (sessionTime) => `

هذه تذكرتك (بطاقة الدخول) برجاء الاستعداد لإظهار  رسالة التأكيد المرسلة لك عبر البريد الالكتروني في هذا الحدث. تنويه هام :-بدون هذا البريد الإلكتروني لن يتم السماح لك بالدخول لا يوجد استثناء.
<br /><br />
يرجى إحضار قناع.
<br /><br />
ركن 3 دولار
<br /><br />
شكرا لكم لاتمامكم جميع الاسئلة ليوم المواطنة القادم لسنة 2023 تهانينا انت الان مؤهل للمشاركة، لا يوجد عنوان جغرافي محدد لهذا الحدث.
<br /><br />
ليتم دعوتك   
<br /><br />
 تفاصيل موعدك: سيكون في 29  نيسان 2023
 <br /><br />
ا${sessionTime}


<br /><br />
San Jose City College
<br /><br />
2100 Moorpark Ave.
<br /><br />
San Jose, CA 95126
<br /><br />


الرجاء احضر معك كرت الإقامة  البطاقة الخضراء  واضغط على قائمة الأشياء المطلوبة لتعبئة الطلب.<br /><br />
<a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/">LIST OF DOCUMENTS WHICH ARE REQUIRED TO APPLY</a>
<br /><br />
من أجل تقليل خطر التعرض لنقل كوفد 19 من اجل سلامتك وجميع الآخرين و طواقمنا وجميع العائلات من فضلك اتبع الخطوات السهلة التالية: 
<br /><br />
<ul>
<li>ابقى في البيت اذا شعرت بتوعك</li>
<li>استعمل الكمامة وانت داخل المبنى </li>
<li>احضر الى الورشة لوحدك اذا كنت قادرا</li>
<li>اذا كنت بحاجة الى مساعدة تعال ومعك شخص آخر لمساعدتك </li>
</ul>
هذه الدعوة هي لك فقط. ولا يجوز تحويلها.  على كل شخص ان يكمل الفيديو وتعبئة الاستمارة حتى تتأهل 
<br /><br />
ونظرا للاماكن المحدودة لن نضمن ان نقدم لكم خدمات. 
<br /><br />
شكرا لتعاونكم و صبركم وتفهمكم 
<br /><br />
المخلص لكم 


`,
    },
    ps: {
        red: `د خدماتو لپاره وړ ندي (سوړ ټکی)<br /><br />
        
د  ۲۰۲۲ راتلونکي تابعیت ورځېپروګرام لپاره د ټولو پوښتنو بشپړولو لپاره مننه. له بده مرغه، ستاسو قضیه ډیره پیچلې ښکاري او موږ به هغو کسانو ته لومړیتوب ورکړو چې وړتیا لري. ستاسو د تلیفون معلومات به زموږ کارمندانو ته ورکړل شي او دوی به لومړی تاسو سره د تلیفون له لارې اړیکه ونیسي. زموږ کارمندان به هڅه وکړي چې تاسو سره دوه ځله اړیکه ونیسي. تاسو ممکن د ۲۰۲۲ کال د جون په لومړۍ نیمایي کې تلیفون ترلاسه کړئ. موږ د ډیری غوښتونکي تمه لرو، نو دا ممکن یوه اونۍ یا ډیر 
<br /><br />وخت ونیسي مخکې لدې چې تاسو تلیفون ترلاسه کړئ.
<br /><br />
 <a href="http://bit.ly/SCCreferralENGLISH">http://bit.ly/SCCreferralENGLISH</a> ، یوه اداره غوره کړئ او د ملاقات لپاره ورسره اړیکه ونیسئ - هغه خدمتونه چې تاسو یې غوره کوئ ممکن وړیا نه وي او د ۲۰۲۲ کال د تابعیت د ورځې 
<br /><br />
پروګرام برخه نه وي.
د محدود ځای له امله، موږ نشو تضمین کولی چې تاسو به خدمتونه ترلاسه کړئ.
<br /><br />
ستاسو د همکارۍ، صبر او تفاهم لپاره مننه.
<br /><br />
په درنښت،

<br /><br />
د نوي اتباعو پروژه

`,
        green: (sessionTime) => `

دا ستاسو ټکټ دی. مهرباني وکړئ چمتو اوسئ چې په برنامي کې د دې تایید بریښنالیک وښایئ. د دې بریښنالیک پرته، تاسو ته دننه اجازه نه ورکول کیږي. هیڅ استثنا نشته
<br /><br />
مهرباني وکړئ ماسک راوړئ.
<br /><br />
پارکینګ $3
<br /><br />
د راتلونکی ۲۰۲۳ تابعیت ورځې برنامې لپاره د ټولو پوښتنو بشپړولو لپاره مننه. مبارک، تاسو د ګډون لپاره وړ یاست!
<br /><br />
نیټه: شنبه، د اپریل ۲۹، ۲۰۲۳<br /><br />
د ملاقات وخت: د سهار ۹${sessionTime}

<br /><br />
San Jose City College
<br /><br />
2100 Moorpark Ave.
<br /><br />
San Jose, CA 95126
<br /><br />
مهرباني وکړئ خپل شین کارت له ځانه سره راوړئ!
<br /><br />
<a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/">او د اسنادو په لیست باندې کلیک وکړئ کوم چې د غوښتنلیک لپاره اړین دي</a>
<br /><br />
د COVID-19 د خپریدو د خطر کمولو لپاره، ستاسو د خوندیتوب، زموږ کارمندانو او ټولو کورنیو لپاره، مهرباني وکړئ دا اسانه ګامونه تعقیب کړئ:
<br /><br />
<ul>
<li>په کور کې پاتې شئ که تاسو ښه احساس نه کوئ</li>
<li>د ودانۍ دننه د ماسک څخه کار واخلئ</li>
<li>که چیری امکان لري نو یوازې په برنامې کې ګډون وکړی ، که تاسو مرستې ته اړتیا لرئ مهرباني وکړئ یوازې یو بل کس سره راشئ چې ستاسو سره مرسته وکړي</li>
<li>دا بلنه یوازې ستاسو لپاره ده. دا د انتقال وړ نه دی. هر سړی باید ویډیو او  پوښتنلیک بشپړه کړي، ترڅو بلنه ورکړل شي.</li>
</ul>

د محدود ځای له امله، موږ نشو کولی تضمین وکړو چې تاسو به خدمتونه ترلاسه کړئ.
<br /><br />

ستاسو د همکارۍ، صبر او تفاهم لپاره مننه.
<br /><br />
په اخلاص،
<br /><br />
د نوي اتباعو پروژه

`,
    },
    ru: {
        red: `Благодарим вас за ответы на все вопросы по поводу предстоящего Дня гражданства 2021 года. К сожалению, ваше дело кажется достаточно сложным, и мы в первую очередь будем заниматься теми, кто прошел по конкурсу. Ваш номер телефона будет передан нашим сотрудникам, чтобы они могли связаться с вами. Наши сотрудники попытаются связаться с вами два раза. Вам могут позвонить в первой половине июня 2021 года. Мы ожидаем много заявок, поэтому может пройти неделя, прежде чем вам позвонят.

Если вы не хотите ждать, посетите сайт <a href="http://bit.ly/SCCreferralRUSSIAN">http://bit.ly/SCCreferralRUSSIAN<a/> (СПИСОК ЮРИДИЧЕСКИХ УСЛУГ ПО ИММИГРАЦИИ САНТА-КЛАРА), выберите агентство и свяжитесь с ним, чтобы записаться на прием. Выбранные вами услуги могут быть платными и не являются частью мероприятия Дня гражданства 2021 года.
<br /><br />
В связи с ограничениями в размещении и СOVID-19 мы не можем гарантировать услуги всем желающим.
<br /><br />
Благодарим за сотрудничество и понимание.
<br /><br />
С уважением,
<br /><br />
ПРОЕКТ НОВЫЙ ГРАЖДАНИН
`,
        green: (sessionTime) => `Регистрационный номер: CD 02020314
<br /><br />
ЭТО ВАША ВХОДНАЯ КАРТА. БУДЬТЕ ГОТОВЫ ПОКАЗАТЬ НАМ ЭТО ЭЛЕКТРОННОЕ ПИСЬМО КОГДА ПРИДЕТЕ НА ЭТО МЕРОПРИЯТИЕ. БЕЗ ЭТОГО ЭЛЕКТРОННОГО ПИСЬМА НЕ РАЗРЕШИТСЯ ВОЙТИ - БЕЗ НИКАКИХ ИСКЛЮЧЕНИЙ.
<br /><br />
Принесите маску пожалуйста.
<br /><br />
Парковка $3
<br /><br />
Благодарим за ответы по анкете “День Гражданства 2023”. 
<br /><br />
Поздравляем! Вы получили право на участие! 
<br /><br />
ИНФОРМАЦИЯ О ПРИЕМЕ:
<br /><br />
ДАТА: 29-е АПРЕЛЯ 2023 г.
<br /><br />
ВРЕМЯ: ${sessionTime}
<br /><br />
San Jose City College
<br /><br />
2100 Moorpark Ave.
<br /><br />
San Jose, CA 95126
<br /><br />

ПОЖАЛУЙСТА, ИМЕЙТЕ ПРИ СЕБЕ КАРТОЧКУ ПОСТОЯННО РЕЗИДЕНТА (green card) 
НАЖМИТЕ НА ССЫЛКУ <a href="https://www.e-immigrate.info/citizenship/basic-requirements-to-apply-for-citizenship-english/"> LIST OF DOCUMENTS WHICH ARE REQUIRED TO APPLY</a>
<br /><br />
Для сведения к минимуму риска заражения и передачи COVIS-19 для вас и всех присутствующих на мероприятии, в том числе наших сотрудников, пожалуйста, соблюдайте меры предосторожности: 
<br /><br />
<ul>
<li>Оставайтесь дома, если нездоровы</li>
<li>Надевайте маску в помещении</li>
<li>По возможности не приводите с собой кого-либо</li>
<li>Если нужна помощь, пожалуйста, приходите с одним сопровождающим</li>
</ul>

ПРИГЛАШЕНИЕ ТОЛЬКО ДЛЯ ВАС. ОНО НЕ МОЖЕТ БЫТЬ ПЕРЕДАНО КОМУ-ЛИБО ДРУГОМУ. ДЛЯ ПРИГЛАШЕНИЯ СЛЕДУЕТ ПОСМОТРЕТЬ ВИДЕО, ЗАПОЛНИТЬ АНКЕТУ И ПРОЙТИ ПО КОНКУРСУ.
<br /><br />
В связи с ограничениями в размещении мы не можем гарантировать услуги всем желающим.
<br /><br />
Благодарим за содействие и понимание.
<br /><br />
С уважением,
<br /><br />
ПРОЕКТ НОВЫЙ ГРАЖДАНИН




`,
    },
};

module.exports = emailContents;
