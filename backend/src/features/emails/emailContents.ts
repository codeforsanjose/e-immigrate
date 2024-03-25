<<<<<<<< HEAD:backend/src/features/emails/emailContents.ts
import { EmailContent } from "./types.js";

========
export type EmailContentLanguages = keyof typeof emailContents;
export function isEmailContentLanguage(value?: string | null | undefined): value is EmailContentLanguages {
    if (value == null) return false;
    else if (value === '') return false;
    return value in emailContents;
}
>>>>>>>> develop:backend/src/routes/sendEmail/emailContent.ts
export const emailContents = {
    en: {
        red: `Thank you for completing all questions for the upcoming Citizenship Day 2022 event. Unfortunately, your case appears too complex and we will give priority to those who have qualified. Your phone information will be given to our staff and they will contact you by phone first. Our staff will attempt to contact you two times. You may receive a call in the first half of June 2022. We expect many applicants, so it may take one week or more before you receive a call
If you do not wish to wait, please visit <a href="https://www.e-immigrate.info/partners/santa-clara-county-immigration-legal-services-referral-list/">SANTA CLARA COUNTY IMMIGRATION LEGAL SERVICES LIST</a>, select an agency and contact them to make an appointment - the services you choose may not be free and are not part of Citizenship Day 2022 event.
Due to limited space, we cannot guarantee that you will receive services.
Thank you for your cooperation, patience, and understanding.
Sincerely, 
PROJECT NEW CITIZEN
`,
        green: `Thank you for completing all questions for the upcoming Citizenship Day 2022 event. Congratulations, you have qualified to participate! There is no physical address for this event. We will contact you by phone first. Our staff will attempt to contact you two times. Our staff will give you instructions on what you need to do. We will begin calling all qualified candidates starting Monday, May 16th. We expect many applicants, so it may take one week or more before you receive a call.
        Due to limited space  we cannot guarantee that you will receive services.<br /><br />Thank you for your cooperation, patience, and understanding. <br /><br />Sincerely, PROJECT NEW CITIZEN`,
    },
    es: {
        red: `Gracias por completar todas las preguntas para el Día de la Ciudadanía del 2022. Desafortunadamente, su caso parece demasiado complejo y le daremos prioridad a los que calificaron. Su información será compartida con nuestro personal y ellos intentarán comunicarse por teléfono con usted dos veces.
<br /><br />Es posible que reciba una llamada durante las primeras dos semanas de junio del 2022. Esperamos muchos solicitantes, por lo que puede tomar hasta una semana antes de recibir una llamada.
<br /><br />Si no desea esperar, visite, <a href="http://bit.ly/SCCreferralSPANISH" >http://bit.ly/SCCreferralSPANISH</a>, seleccione una agencia y comuníquese con ellos para programar una cita; es posible que los servicios que elija tengan algún costo y no forman parte del evento, Día de la Ciudadanía del 2022.
<br /><br />Debido al espacio limitado y al COVID-19, no podemos garantizar que recibirá los servicios.
<br /><br />
Gracias por su cooperación, paciencia y comprensión.
<br /><br />
Atentamente,
<br /><br />
PROYECTO NUEVO CIUDADANO
`,
        green: `Gracias por completar todas las preguntas para el evento, Día de la Ciudadanía del 2022. ¡Felicitaciones, has calificado para participar! No hay una dirección física para este evento. Primero, nos comunicaremos con usted por teléfono. Nuestro personal intentará comunicarse con usted dos veces. Nuestro personal le dará instrucciones sobre lo que debe hacer. Comenzaremos a llamar a todos los candidatos calificados a partir del lunes 16 de mayo. Esperamos muchos solicitantes, por lo que puede tomar hasta una semana antes de recibir una llamada.
        <br /><br />Debido al espacio limitado, no podemos garantizar que recibirá servicios.
<br /><br />Gracias por su cooperación, paciencia y comprensión.<br /><br />Atentamente,<br /><br />PROYECTO NUEVO CIUDADANO
`,
    },
    vi: {
        red: `Không đủ điều kiện cho các dịch vụ<br /><br />
        Cảm ơn bạn đã hoàn thành tất cả các câu hỏi cho Ngày nhập tịch 2022 sắp tới. Rất tiếc, trường hợp của bạn có vẻ quá phức tạp và chúng tôi sẽ ưu tiên những người đủ điều kiện. Thông tin điện thoại của bạn sẽ được cung cấp cho nhân viên của chúng tôi và họ sẽ liên hệ với bạn qua điện thoại trước. Nhân viên của chúng tôi sẽ cố gắng liên hệ với bạn hai lần. Bạn có thể nhận được cuộc gọi vào nửa đầu tháng 6 năm 2022. Sẽ có nhiều người nộp đơn, vì vậy có thể mất một tuần trước khi bạn nhận được cuộc gọi.
<br /><br />
Nếu bạn không muốn đợi, vui lòng truy cập <a href="http://bit.ly/SCCreferralVIETNAMESE" >http://bit.ly/SCCreferralVIETNAMESE</a>, chọn một cơ quan và liên hệ với họ để đặt lịch hẹn - các dịch vụ bạn chọn có thể không miễn phí và không nằm trong Ngày Nhập tịch năm 2022.

<br /><br />
Do vì chỗ có giới hạn, chúng tôi không thể đảm bảo rằng bạn sẽ nhận được dịch vụ.
<br /><br />
Cảm ơn bạn đã hợp tác, kiên nhẫn và thông cảm.
<br /><br />
Thân mến,
Project New Citizen
`,
        green: `Đủ điều kiện cho các dịch vụ<br /><br />
        Cảm ơn bạn đã hoàn thành tất cả các câu hỏi cho Ngày nhập tịch 2022 sắp tới. Xin chúc mừng, bạn đã đủ điều kiện để tham gia! Không có địa chỉ để bạn đến cho ngày nhập tịch này. Chúng tôi sẽ liên hệ với bạn qua điện thoại trước. Nhân viên của chúng tôi sẽ cố gắng liên hệ với bạn hai lần. Nhân viên của chúng tôi sẽ hướng dẫn bạn những việc bạn cần làm. Chúng tôi sẽ bắt đầu gọi tất cả các ứng viên đủ điều kiện bắt đầu từ Thứ Hai, ngày 16 tháng Năm. Sẽ có nhiều người nộp đơn, vì vậy có thể mất một tuần trước khi bạn nhận được cuộc gọi.
<br /><br />
Do vì chỗ có giới hạn, chúng tôi không thể đảm bảo rằng bạn sẽ nhận được dịch vụ.
<br /><br />
Cảm ơn bạn đã hợp tác, kiên nhẫn và thông cảm.
<br /><br />
Thân mến,
Project New Citizen
`,
    },
    // Mandarin
    cmn: {
        red: `谢谢您回答有关即将举行的2022年公民日活动的问卷里所有的问题。不好意思，您的个案看来太复杂。我们会优先处理那些符合资格的人士。您的电话号码会交给我们的员工，他们将会先打电话和您联系。我们的员工会尝试两次和您联络。您可能在2022年6月上半月收到电话。我们期待会有很多申请人，所以您有可能需时至少一周才能收到我们的电话。


如果您不想等待，请浏览 <a href="http://bit.ly/SCCreferralMANDARIN">http://bit.ly/SCCreferralMANDARIN</a>，选择一个机构，与他们联络并预约 -- 您选择的服务未必是免费的，并且也不是2022年公民日的活动范围。
<br /><br />
由于名额有限，我们不能够保证您将会获得服务。
<br /><br />
谢谢您的合作，耐心，和谅解。
<br /><br />
新公民计划 敬上
`,
        green: `谢谢您回答有关即将举行的2022年公民日活动的问卷里所有的问题。恭喜您！您有资格参与此活动。这项活动是没有实际地址的。我们将会先打电话和您联系。我们的员工会尝试两次和您联络。我们的员工会给您指示，告诉您您需要做的事情。我们会从5月16日星期一开始打电话给所有符合资格的人士。我们期待会有很多申请人，所以您有可能需时至少一周才能收到我们的电话。
<br /><br />
由于名额有限，我们不能够保证您将会获得服务。
<br /><br />
谢谢您的合作，耐心，和谅解。
<br /><br />
新公民计划 敬上
`,
    },
    // CANTONESE
    yue: {
        red: `谢谢您回答有关即将举行的2022年公民日活动的问卷里所有的问题。不好意思，您的个案看来太复杂。我们会优先处理那些符合资格的人士。您的电话号码会交给我们的员工，他们将会先打电话和您联系。我们的员工会尝试两次和您联络。您可能在2022年6月上半月收到电话。我们期待会有很多申请人，所以您有可能需时至少一周才能收到我们的电话。


如果您不想等待，请浏览 <a href="http://bit.ly/SCCreferralMANDARIN">http://bit.ly/SCCreferralMANDARIN</a>，选择一个机构，与他们联络并预约 -- 您选择的服务未必是免费的，并且也不是2022年公民日的活动范围。
<br /><br />
由于名额有限，我们不能够保证您将会获得服务。
<br /><br />
谢谢您的合作，耐心，和谅解。
<br /><br />
新公民计划 敬上
`,
        green: `谢谢您回答有关即将举行的2022年公民日活动的问卷里所有的问题。恭喜您！您有资格参与此活动。这项活动是没有实际地址的。我们将会先打电话和您联系。我们的员工会尝试两次和您联络。我们的员工会给您指示，告诉您您需要做的事情。我们会从5月16日星期一开始打电话给所有符合资格的人士。我们期待会有很多申请人，所以您有可能需时至少一周才能收到我们的电话。
<br /><br />
由于名额有限，我们不能够保证您将会获得服务。
<br /><br />
谢谢您的合作，耐心，和谅解。
<br /><br />
新公民计划 敬上
`,
    },
    // Korean
    kor: {
        red: `다가오는 2022년 시민의 날 행사에 대한 모든 질문을 완료해 주셔서 감사합니다. 유감스럽게도 귀하의 사건은 너무 복잡해 보이며, 우리는 자격이 있는 사람들에게 우선권을 줄 것입니다. 당신의 전화 정보는 우리 직원에게 전달될 것이고, 그들은 먼저 전화로 당신에게 연락할 것입니다. 우리 직원이 당신에게 두 번 연락을 시도할 것입니다. 2022년 6월 상반기에 전화를 받으실 수 있습니다. 신청자가 많을 것으로 예상되므로, 전화를 받기까지 1주일 정도 걸릴 수 있습니다.
<br /><br />기다리지 않으려면 <a href="http://bit.ly/SCCreferralKOREAN">http://bit.ly/SCCreferralKOREAN</a> 방문하여 기관을 선택한 후 그들에게 연락하여 약속을 잡으십시오. 선택한 서비스는 무료가 아닐 수 있으며 2022년 시민의 날 행사에 포함되지 않을 수 있습니다.
<br /><br />
제한된 공간으로 인해 서비스를 받을 수 있다고 보장할 수 없습니다.
<br /><br />
여러분의 협조, 인내, 이해에 진심으로 감사드립니다.
<br /><br />
신규 시민 프로젝트
`,
        green: `다가오는 2022 시민권의 날 행사에 대한 모든 질문을 완료해 주셔서 감사합니다. 축하합니다, 참가 자격이 있습니다! 이 이벤트에 대한 실제 주소가 없습니다. 저희가 먼저 전화로 연락 드리겠습니다. 저희 직원이 두 번 연락을 드릴 것 입니다. 저희 직원이 당신이 해야 할 일에 대한 지시를 해 드릴것 입니다. 우리는 5월 16일 월요일부터 모든 자격을 갖춘 후보자에게 전화를 걸 것입니다. 신청자가 많을것으로 예상되므로,  전화를 받기까지 1주일 정도 걸릴 수 있습니다. 

제한된 공간으로 인해 서비스를 받을 수 있다고 보장할 수 없습니다.
<br /><br />
여러분의 협조, 인내, 이해에 진심으로 감사드립니다.
<br /><br />
신규 시민 프로젝트
`,
    },
    tl: {
        red: `Salamat po sa pagkumpleto ng lahat ng mga katanungan para sa darating na kaganapang Araw ng Pagkamamayan 2022. Sa kasamaang palad, ang iyong kaso ay masyadong kumplikado. Binibigyan po namin ng priyoridad ang mga may kwalipikado aplikante. Ibibigay po namin ang inyong telepono sa aming staff para makipag-ugnay sila sa inyo sa telepono. 
<br />Susubukan po ng aming mga staff na makipag-ugnay sa iyo ng dalawang beses. Maaari po kayong makatanggap ng isang tawag sa ika-dalawang linggo Hunyo 2022. Inaasahan po namin na maraming mga aplikante, kaya't maaaring tumagal ng hanggang isang linggo bago kayo makatanggap ng tawag.
<br /><br />
Kung hindi po ninyong nais na maghintay, mangyaring bisitahin po ninyo ang <a href="http://bit.ly/SCCreferralTAGALOG">http://bit.ly/SCCreferralTAGALOG</a>. Pumili kayo ng isang ahensya at makipag-ugnay po sa kanila upang gumawa ng isang appointment - ang mga serbisyong pinili ninyo ay maaaring hindi libre at hindi bahagi ng Citizenship Day 2022 event.
<br /><br />
Dahil sa aming  limitadong kakayahan sa panahong ngayong, hindi po namin masisiguro na makakatanggap kayo ng mga serbisyo.

<br /><br />
Salamat po sa iyong kooperasyon, pasensya, at pag-unawa.
<br /><br />
Taos-puso,
<br /><br />
PROJECT NEW CITIZEN
`,
        green: `Kwalipikado para sa mga serbisyo (berde-tuldok)<br /><br />
        <br /><br />Salamat po sa pagkumpleto ng lahat ng mga katanungan para sa darating na kaganapang Araw ng Pagkamamayan 2022. Binabati namin kayo sapagkat kayo ay kwalipikadong lumahok! Wala po kaming pisikal na address para sa kaganapang ito. Makikipag-ugnay po kami sa inyo sa pamamagitan ng telepono. Susubukan po ng aming mga kasamahan na makipag-ugnay sa inyo ng dalawang beses. Bibigyan po namin kayo ng mga tagubilin kung ano ang inyong mga kailangan ninyong gawin. Sisimulan po naming tawagan ang lahat ng mga kwalipikadong kandidato sa Lunes, ika-16 ng Mayo. Inaasahan po namin na marami ang mga aplikante, kaya't maaaring pong tumagal sa hanggang isang linggo bago kayo makatanggap ng isang tawag.
<br /><br />Dahil po sa aming limitadong kakayahan sa panahong ngayong, hindi namin masisiguro na makakatanggap kayo ng mga serbisyo.

<br /><br />Salamat sa iyong kooperasyon, pasensya, at pag-unawa.

        <br /><br />
Salamat sa iyong kooperasyon, pasensya, at pag-unawa.
<br /><br />
Taos-puso,
<br /><br />
PROJECT NEW CITIZEN
`,
    },
    am: {
        red: `መስፈርቱን ያላሟሉና በዚህ መርሃ ግብር መሳተፍ የማይችሉ ሰዎች (ቀይ ነጥብ)
        <br /><br />በ2022 ለሚደረገው የዜግነት መርሃ ግብር ለመሳተፍ የሚችሉትን ሰዎች ለማጣራት የቀረቡትን ጥያቄወች በሙሉ በመመለስዎ በጣም እናመሰናለን፡፡ በመርሃ ግብሩ ለመሳተፍ ጉዳይዎ በጣም የተወሳሰበ ሆኖ ስላገኘነው ብቁ ሆነው ላገኘናቸው እጩዎች ቅድሚያ የምንሰጥ መሆኑን ስንገልፅልዎ እናዝናለን፡፡ ለባልደረቦቻችን ስልክ ቁጥርዎን እንሰጣቸውና ደውለው ያናግሩዎታል፡፡በመጀምሪያው የስልክ ጥሪ ካለገኘንዎ ለሁለተኛ ጊዜ ደውለን ልናገኝዎት እንሞክራለን፡፡ በግሪጎሪሲዮን የዘመን አቆጣጠር በያዝነው አመት በ2022 በስድስተኛው ወር አጋማሺ ወይንም (በJune አጋማሺ) ላይ እንደውልለዎታለን፡፡ የአመልካቾች ቁጥር በርከት ሊል ስለሚችል ደውሎ ለማናገር ከአንድ ሳምንት በላይ ሊወስድብን ይችል ይሆናል፡፡ 

        <br /><br />የእኛን የስልክ ጥሪ መጠበቅ ካልፈቀዱ እባክዎን ይህን አስፈንጣሪ ይጫኑና <a href="http://bit.ly/SCCreferralAMHARIC">http://bit.ly/SCCreferralAMHARIC</a>, ከተዘረዘሩት ድርጅቶች ውስጥ መርጠው በመደወል ቀጠሮ ይያዙ፡፡ የተዘረዘሩት ድርጅቶችና የሚሰጡት አገልግሎት ነፃ ላይሆን ይችላል በተጨማሪም የ2022  የዜግነት ቀን መርሃ ግብር አካልም አይደለም፡፡ 

        <br /><br />በአለብን የአቅም ውስንነት ምክንያት በእርግጠኝነት አገልግሎቱን ያገኛሉ ብለን ማረጋገጫ መስጠት አይቻለንም፡፡
        <br /><br />ስለትብብርዎ ስለታጋሺነትዎና  ስለአስተዎይነትዎ እናመሰግናለን፡፡
        <br /><br />ከታላቅ አክብሮት ጋር
        <br /><br />የአዲስ ዜጎች ፕሮጀክት
`,
        green: `መስፈርቱን አሟልተው አገልግሎቱን ለማግኘት ብቁ የሆኑ ሰዎች (አረንጓዴ ነጥብ)
        <br /><br />በ2022 ለሚደረገው የዜግነት መርሃ ግብር ለመሳተፍ የሚችሉትን ሰዎች ለማጣራት የቀረቡትን ጥያቄወች በሙሉ በመመለስዎ በጣም እናመሰናለን፡፡ እንኳን ደስ ያለዎት በዚህ መርሃ ግብር ላይ ለመሳተፍ ብቁ ሆነው አግኝተንዎታል፡፡ ይህ መርሃ ግብር በአካአል የሚገኙበት ወይንም የሚሄዱበት ቢሮ አይኖርም፡፡ እራሳችን እንደውልልዎትና እናገኝዎታለን፡፡ በመጀመሪያው የስልክ ጥሪ ልናገኝዎት ካልቻልን ለሁለትኛ ጊዜ እንሞክራለን፡፡ የሚደውልልዎት ባልደረባችን ማድረግ ያለብዎትን ቀጣይ እርምጃወች ያብራራልዎታል፡፡ የዚህን መርሃ ግብር መስፈርት ላሟሉ ግለሰቦች ሁሉ ከግንቦት 8 ቀን ወይንም May 16 ጀምሮ እየደወልን ማግኘት እንጀምራለን፡፡ የተሳታፊዎች ቁጥር በርከት ሊል እንደሚችል እንገምታለን በመሆኑም ሁሉንም ተሳታፊ ደውሎ ለማግኘት የአንድ ሳምንት ጊዜ ሊወስድብን ይችላል፡፡
<br /><br />በአለብን የአቅም ውስንነትና በ ኮቪድ 19 ምክንያት በእርግጠኝነት አገልግሎቱን ያገኛሉ ብለን ማረጋገጫ መስጠት አይቻለንም፡፡
<br /><br />ስለትብብርዎ ስለታጋሺነትዎና  ስለአስተዎይነትዎ እናመሰግናለን፡፡
<br /><br />ከታላቅ አክብሮት ጋር
<br /><br />የአዲስ ዜጎች ፕሮጀክት`,
    },
    hi: {
        red: `सेवाओं के लिए योग्य नहीं (रेड-डॉट)
<br /><br />
आगामी नागरिकता दिवस 2022 कार्यक्रम के लिए सभी प्रश्नों को पूरा करने के लिए धन्यवाद। दुर्भाग्य से, आपका मामला बहुत जटिल है और हम उन लोगों को प्राथमिकता देंगे जो योग्य हैं। आपके फोन की जानकारी हमारे कर्मचारियों को दी जाएगी और वे पहले आपसे फोन पर संपर्क करेंगे। हमारे कर्मचारी आपसे दो बार संपर्क करने का प्रयास करेंगे। आपको जून 2022 की पहली छमाही में एक कॉल प्राप्त हो सकती है। हम कई आवेदकों से अपेक्षा करते हैं, इसलिए आपको कॉल प्राप्त करने में एक सप्ताह तक का समय लग सकता है।
<br /><br />
यदि आप इंतजार नहीं करना चाहते हैं, तो कृपया सांता क्लारा काउंटी <a href="http://bit.ly/SCCreferralHINDI">http://bit.ly/SCCreferralHINDI</a> पर जाएं, एक एजेंसी का चयन करें और समय निर्धारित   करने के लिए उनसे संपर्क करें - आपके द्वारा चुनी गई सेवाएं मुफ्त नहीं हो सकती हैं और नागरिक दिवस 2022 event का हिस्सा नहीं हैं।
<br /><br />
सीमित स्थान के कारण, हम यह गारंटी नहीं दे सकते कि आपको सेवाएँ प्राप्त होंगी।
आपके सहयोग, धैर्य और समझ के लिए धन्यवाद।
<br /><br />
साभार,
<br /><br />
प्रोजेक्ट न्यू नागरिक 
`,
        green: `सेवाओं के लिए योग्य (हरा-डॉट)
<br /><br />
आगामी नागरिकता दिवस 2022 कार्यक्रम के लिए सभी प्रश्नों को पूरा करने के लिए धन्यवाद। बधाई हो, आप भाग लेने के लिए योग्य है! इस घटना का कोई भौतिक पता नहीं है। हम सबसे पहले आपसे फोन पर संपर्क करेंगे। हमारे कर्मचारी आपसे दो बार संपर्क करने का प्रयास करेंगे। हमारा स्टाफ आपको निर्देश देगा कि आपको क्या करने की आवश्यकता है। हम 16 मई से सोमवार से सभी योग्य उम्मीदवारों को बुलाना शुरू करेंगे। हम कई आवेदकों से अपेक्षा करते हैं, इसलिए आपको कॉल प्राप्त करने में एक सप्ताह से अधिक समय लग सकता है।
<br /><br />
सीमित स्थान के कारण, हम यह गारंटी नहीं दे सकते कि आपको सेवाएँ प्राप्त होंगी।
आपके सहयोग, धैर्य और समझ के लिए धन्यवाद।
<br /><br />
साभार,
<br /><br />
प्रोजेक्ट न्यू नागरिक 
`,
    },
    pan: {
        red: `ਸੇਵਾਵਾਂ ਲਈ ਯੋਗ ਨਹੀਂ (ਲਾਲ  ਬਿੰਦੀ)
 <br /><br />ਆਉਣ ਵਾਲੇ ਸਿਟੀਜ਼ਨਸ਼ਿਪ ਡੇ 2022 ਸਮਾਗਮ ਲਈ ਸਾਰੇ ਪ੍ਰਸ਼ਨਾਂ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਤੁਹਾਡਾ ਧੰਨਵਾਦ।  ਬਦਕਿਸਮਤੀ ਨਾਲ, ਤੁਹਾਡਾ ਕੇਸ ਬਹੁਤ ਗੁੰਝਲਦਾਰ ਜਾਪਦਾ ਹੈ ਅਤੇ ਪਹਿਲਾਂ ਅਸੀਂ ਉਨ੍ਹਾਂ ਨੂੰ ਤਰਜੀਹ ਦੇਵਾਂਗੇ ਜਿਨ੍ਹਾਂ ਨੇ ਯੋਗਤਾ ਪੂਰੀ ਕੀਤੀ ਹੈ।  ਤੁਹਾਡੇ ਫੋਨ ਦੀ ਜਾਣਕਾਰੀ ਸਾਡੇ ਸਟਾਫ ਨੂੰ ਦਿੱਤੀ ਜਾਵੇਗੀ ਅਤੇ ਉਹ ਪਹਿਲਾਂ ਤੁਹਾਡੇ ਨਾਲ ਫੋਨ ਰਾਹੀਂ ਸੰਪਰਕ ਕਰਨਗੇ।  ਸਾਡਾ ਸਟਾਫ ਤੁਹਾਡੇ ਨਾਲ ਦੋ ਵਾਰ ਸੰਪਰਕ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੇਗਾ।  ਤੁਸੀਂ ਜੂਨ 2022 ਦੇ ਪਹਿਲੇ ਅੱਧ ਵਿੱਚ ਇੱਕ ਕਾਲ ਪ੍ਰਾਪਤ ਕਰ ਸਕਦੇ ਹੋ।  ਅਸੀਂ ਬਹੁਤ ਸਾਰੇ ਬਿਨੈਕਾਰਾਂ ਦੀ ਉਮੀਦ ਕਰਦੇ ਹਾਂ, ਇਸ ਲਈ ਤੁਹਾਡੇ ਦੁਆਰਾ ਇੱਕ ਕਾਲ ਪ੍ਰਾਪਤ ਹੋਣ ਵਿੱਚ ਇੱਕ ਹਫਤਾ ਲੱਗ ਸਕਦਾ ਹੈ.
ਜੇ ਤੁਸੀਂ ਇੰਤਜ਼ਾਰ ਨਹੀਂ ਕਰਨਾ ਚਾਹੁੰਦੇ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ <a href="http://bit.ly/SCCreferralPUNJABI">http://bit.ly/SCCreferralPUNJABI</a> ਵੇਖੋ, ਕਿਸੇ ਏਜੰਸੀ ਦੀ ਚੋਣ ਕਰੋ ਅਤੇ ਉਨ੍ਹਾਂ ਨਾਲ ਮੁਲਾਕਾਤ ਕਰਨ ਲਈ ਸੰਪਰਕ ਕਰੋ - ਜਿਹੜੀਆਂ ਸੇਵਾਵਾਂ ਤੁਸੀਂ ਚੁਣਦੇ ਹੋ ਉਹ ਮੁਫਤ ਨਹੀਂ ਹੋ ਸਕਦੀਆਂ ਅਤੇ ਨਾਗਰਿਕਤਾ ਦਿਵਸ 2022 ਦੇ ਹਿਸੇ ਦਾ ਹਿੱਸਾ ਨਹੀਂ ਹਨ। 
 <br /><br />
ਸੀਮਤ ਜਗ੍ਹਾ ਦੇ ਕਾਰਨ, ਅਸੀਂ ਗਰੰਟੀ ਨਹੀਂ ਦੇ ਸਕਦੇ ਕਿ ਤੁਸੀਂ ਸੇਵਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋਗੇ ਹੀ। 
 <br /><br />
ਤੁਹਾਡੇ ਸਹਿਯੋਗ, ਸਬਰ ਅਤੇ ਸਮਝ ਲਈ ਧੰਨਵਾਦ। 
 <br /><br />
ਸੁਹਿਰਦ,
<br /><br />
ਪ੍ਰਾਜੈਕਟ ਨਵਾਂ ਸਿਟੀਜ਼ਨ
`,
        green: `ਸੇਵਾਵਾਂ ਲਈ ਯੋਗ (ਹਰੇ-ਡਾਟ )

<br /><br />
ਆਉਣ ਵਾਲੇ ਸਿਟੀਜ਼ਨਸ਼ਿਪ ਡੇ 2022  ਸਮਾਗਮ ਲਈ ਸਾਰੇ ਪ੍ਰਸ਼ਨਾਂ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਤੁਹਾਡਾ ਧੰਨਵਾਦ। ਵਧਾਈਆਂ ! ਤੁਸੀਂ ਹਿੱਸਾ ਲੈਣ ਲਈ ਯੋਗਤਾ ਪੂਰੀ ਕੀਤੀ ਹੈ! ਇਸ ਸਮਾਗਮ ਲਈ ਕੋਈ ਸਥਾਯੀ  ਪਤਾ ਨਹੀਂ ਹੈ।  ਅਸੀਂ ਪਹਿਲਾਂ ਤੁਹਾਡੇ ਨਾਲ ਫੋਨ ਰਾਹੀਂ ਸੰਪਰਕ ਕਰਾਂਗੇ।  ਸਾਡਾ ਸਟਾਫ ਤੁਹਾਡੇ ਨਾਲ ਦੋ ਵਾਰ ਸੰਪਰਕ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੇਗਾ।  ਸਾਡਾ ਸਟਾਫ ਤੁਹਾਨੂੰ ਇਸ ਬਾਰੇ ਨਿਰਦੇਸ਼ ਦੇਵੇਗਾ ਕਿ ਤੁਹਾਨੂੰ ਕੀ ਕਰਨ ਦੀ ਜ਼ਰੂਰਤ ਹੈ।  ਅਸੀਂ ਸਾਰੇ ਯੋਗਤਾ ਪ੍ਰਾਪਤ ਉਮੀਦਵਾਰਾਂ ਨੂੰ ਸੋਮਵਾਰ, 16 ਮਈ ਤੋਂ ਸੰਪਰਕ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰਾਂਗੇ।  ਅਸੀਂ ਬਹੁਤ ਸਾਰੇ ਬਿਨੈਕਾਰਾਂ ਦੀ ਉਮੀਦ ਕਰਦੇ ਹਾਂ, ਇਸ ਲਈ ਤੁਹਾਡੇ ਦੁਆਰਾ ਕਾਲ ਆਉਣ ਤੇ ਜਬਾਬ ਦੇਣਵਿੱਚ ਇਕ ਹਫਤੇ ਤਕ ਦਾ ਸਮਾਂ ਲੱਗ ਸਕਦਾ ਹੈ। 
<br /><br />
ਸੀਮਤ ਜਗ੍ਹਾ  ਦੇ ਕਾਰਨ, ਅਸੀਂ ਗਰੰਟੀ ਨਹੀਂ ਦੇ ਸਕਦੇ ਕਿ ਤੁਸੀਂ ਸੇਵਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋਗੇ ਹੀ। 
<br /><br />
ਤੁਹਾਡੇ ਸਹਿਯੋਗ, ਸਬਰ ਅਤੇ ਸਮਝ ਲਈ ਧੰਨਵਾਦ। 
 <br /><br />
ਸੁਹਿਰਦ,
 <br /><br />
ਪ੍ਰਾਜੈਕਟ ਨਵਾਂ ਸਿਟੀਜ਼ਨ
`,
    },
    pt: {
        red: `Obrigado por responder a todas as perguntas para o evento Dia da Cidadania 2022.
<br /><br />
Infelizmente, seu caso parece ser mais complexo e nós daremos prioridade aqueles que se qualificaram. Seu telefone será passado ao nosso time e eles tentarão contata-lo duas vezes.
Espere receber nossa ligação na primeira quinzena de Junho de 2022. Como teremos muitos candidatos, poderá demorar um pouco mais  até que voce receba nossa ligação.
<br /><br />
Se não quiser esperar, visite a <a href="http://bit.ly/SCCreferralPORTUGUESE">http://bit.ly/SCCreferralPORTUGUESE</a>, e entre em contato com alguma  das agencias listadas neste website. Os serviços destas agências poderão não ser gratuitos e não fazem parte do evento Dia da Cidadania 2022.
<br /><br />
Obrigado pela sua cooperação, paciência e compreensão.
<br /><br />
Sinceramente,
<br /><br />
Projeto Novo Cidadão
`,
        green: `Obrigado por responder a todas as perguntas para o evento Dia da Cidadania 2022. 

Parabéns, você se qualificou para participar! Não há endereço físico para este evento. Nós vamos contatá-lo por telefone e nosso time vai ligar para você duas vezes. Nosso time vai lhe dar instruções nos próximos passos. Nós ligaremos para os participantes que se qualificaram a partir de Segunda-Feira, 16 de Maio. Como teremos muitos candidatos, podera levar uma semana ou mais ate que falemos com voce.. 
<br /><br />
Devido ao espaço limitado, não podemos garantir que você receberá nossos serviços.
<br /><br />
Obrigado pela sua cooperação, paciência e compreensão.
<br /><br />
Sinceramente,
<br /><br />
Projeto Novo Cidadão
`,
    },
    fa: {
        red: `کسانی که واجد شرایط نیستند (گروه قرمز)
<br /><br />

از اینکه به کلیه ی سوالات Citizenship Day 2022 پاسخ دادید سپاسگزاریم. متاسفانه پرونده ی شما پیچیده است و ما اولویت را به آنهایی میدهیم که پرونده ی ساده ای دارند. شماره ی تماس شما به کارمندان ما داده خواهد شد و نخست تلاش خواهند کرد تا با شما تماس تلفنی بگیرند. آنها سعی خواهند کرد دو بار با شما تماس بگیرند. احتمالا نیمه ی اول ماه ژوئن سال ۲۰۲۲ با شما تماس می گیریم. بدلیل تعداد بالای متقاضیان ممکن است تماس ما با شما تا یک هفته به طول بینجامد. 
<br /><br />

چنانچه تمایلی به صبر کردن ندارید لطفا http://bit.ly/SCCreferralFARSI را مطالعه کرده و با یکی از سازمانهای موجود برای تعیین وقت مشاوره تماس بگیرید. ممکن است خدماتی که احتیاج دارید بخشی از برنامه ی Citizenship Day 2022 نبوده و رایگان نباشند.<br /><br />
<br /><br />
بدلیل ظرفیت محدود و ویروس کرونا ما نمیتوانیم تضمین کنیم که فرصت خدمت کردن به شما عزیزان را داشته باشیم
<br /><br />
از تعامل، صبر و درک شما سپاسگزاریم.
<br /><br />
با احترام،
<br /><br />
PROJECT NEW CITIZEN
`,
        green: `واجدین شرایط برای دریافت خدمات ( گروه سبز)
<br /><br />

از اینکه به کلیه ی سوالات Citizenship Day 2022 پاسخ دادید سپاسگزاریم. تبریک میگوییم، شما برای شرکت در این برنامه واجدشرایط هستید. برای این منظور، آدرسی وجود ندارد. نخست با شما تماس تلفنی میگیریم. کارمندان ما سعی خواهند کرد دو بار با شما تماس بگیرند و شما را راهنمایی خواهند کرد تا آنچه را که نیاز است انجام دهید. از روز دوشنبه ۱۶ ماه مِی ما تماس با کلیه ی متقاضیان را آغاز خواهیم کرد. بدلیل تعداد بالای متقاضیان ممکن است تماس ما با 
<br /><br />
شما تا یک هفته به طول بینجامد. 
<br /><br />
بدلیل ظرفیت محدود و ویروس کرونا ما نمیتوانیم تضمین کنیم که فرصت خدمت کردن به شما عزیزان را داشته باشیم.
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
        red: `شكرا لكم لاتمامكم جميع الأسئلة عن يوم المواطنة 2022. مع الاسف فان وضعكم معقد جدا ولذا سوف نعطي الأولوية للذين تأهلوا للمشاركة. وسوف نعطي معلومات تلفونكم لموظفينا وسوف يتصلوا عليك بالتلفون اولا. وسوف يحاول موظفينا الاتصال بك مرتين. وربما يتم الاتصال بكم فى للمرة الاولى في النصف الأول من شهر حزيران 2022. ونتوقع الكثير من الطلبات ولذلك ربما تأخذ أسبوعا قبل الاتصال 
        <br /><br />
ك.  
وإذا كنت لا ترغب في الانتظار، من فضلك ادخل على موقع http://bit.ly/SCCreferralARABIC وهناك اختار وكالة واتصل بهم لعمل موعد، وان الخدمات التي تطلبها ربما لا تكون مجانية وهي ليس جزأ من يوم المواطنة 2022. 
<br /><br />
وبسبب الأماكن المحدودة  لن نضمن أن نقدم لك خدمات. 

<br /><br />
شكرا لتعاونكم و صبركم وتفهمكم
<br /><br />
المخلص لكم 
<br /><br />
مشروع المواطن الجديد. 

`,
        green: `شكرا لكم لاتمامكم جميع الاسئلة ليوم المواطنة القادم لسنة 2022. تهانينا انت الان مؤهل للمشاركة، لا يوجد عنوان جغرافي محدد لهذا الحدث. نتصل عليكم بالتلفون في البداية. سيتصل بك  موظفينا مرتين. وسيعطي موظفينا تعليمات لكم حول ما يجب عليك عمله. وسوف نبدأ بالاتصال بكل المرشحين المؤهلين بداية من يوم 16 مايو. ونتوقع الكثير من المشاركين، ولذلك ريما تأخذ مسافة اسبوع قبل الاتصال بكم.
<br /><br />
ونظرا للاماكن المحدودة لن نضمن ان نقدم لكم خدمات.
<br /><br />
شكرا لتعاونكم و صبركم وتفهمكم
<br /><br />
المخلص لكم 
<br /><br />
مشروع المواطن الجديد
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
        green: `د خدماتو لپاره وړ (شنه ټکی)م.
        <br /><br />
د راتلونکی ۲۰۲۲ تابعیت ورځې برنامې لپاره د ټولو پوښتنو بشپړولو لپاره مننه. مبارک، تاسو د ګډون لپاره وړ یاست! د دې پروګرام لپاره هیڅ فزیکي پته نشته. موږ به لومړی تاسو سره د تلیفون له لارې اړیکه ونیسو. زموږ کارمندان به هڅه وکړي چې تاسو سره دوه ځله اړیکه ونیسي. زموږ کارمندان به تاسو ته د هغه څه په اړه لارښوونې درکړي چې تاسو ورته اړتیا لرئ. موږ به د دوشنبې په ورځ، د می په ۱۶ نیټه د ټولو وړ نوماندانو غږ کول پیل کړو. موږ د ډیری غوښتونکو تمه لرو، نو دا ممکن یوه 
<br /><br />
اونۍ یا ډیر وخت ونیسي مخکې لدې چې تاسو تلیفون ترلاسه کړئ.
<br /><br />
د محدود ځای له امله، موږ نشو تضمین کولی چې تاسو به خدمتونه ترلاسه کړئ.
<br /><br />
ستاسو د همکارۍ، صبر او تفاهم څخه مننه.
<br /><br />په درناوي،
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
        green: `Одобрено (зеленая точка)
        <br /><br />
Благодарим за ответы по анкете “День Гражданства 2022”. 
Поздравляем! Вы получили право на участие! У этого мероприятия нет физического адреса. Сначала мы с вами свяжемся по телефону. Наши работники дважды попытаются связаться с вами. Мы дадим вам дальнейшие инструкции. Мы начнем звонить  кандидатам в понедельник 16-го мая. Мы ожидаем много заявок, поэтому может пройти неделя, прежде чем вам позвонят.

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
<<<<<<<< HEAD:backend/src/features/emails/emailContents.ts
} satisfies Record<string, EmailContent>;
========
};

>>>>>>>> develop:backend/src/routes/sendEmail/emailContent.ts
