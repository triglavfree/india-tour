"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plane,
  Droplets,
  Heart,
  Mountain,
  Utensils,
  DollarSign,
  ChevronDown,
  Star,
  Send,
  ArrowRight,
  Phone,
  Mail,
  Quote,
  Zap,
  Users,
  Sparkles,
  Sun,
  Leaf,
  Camera,
  Car,
  Home,
  Wind,
  Church,
} from "lucide-react";

// Tour dates
const TOUR_START_DATE = new Date("2026-04-27T00:00:00");

// Program data with icons
const programData = [
  { date: "27 апреля", description: "Прилёт в Дели, трансфер в Ришикеш, заселение в ашрам", icon: "plane-departure" },
  { date: "28 апреля", description: "Утренняя зарядка, омовение в Ганге. Лекция по писаниям. Храм Шивы. Обзор Ришикеша", icon: "droplets" },
  { date: "29 апреля", description: "Йога, омовение в Ганге. Ягья. Посещение храма. Вечерняя пуджа", icon: "yoga" },
  { date: "30 апреля", description: "Выезд в 5 утра в Бадринатх", icon: "car" },
  { date: "1 мая", description: "Деревня Ману. Путешествие по пути Пандавов к Золотой горе. Храм Нрисимхадева в Джошимате", icon: "mountain" },
  { date: "2 мая", description: "Возвращение в Ришикеш, посещение Девпраяга по дороге", icon: "car" },
  { date: "3 мая", description: "Свободный день", icon: "sun" },
  { date: "4 мая", description: "Посещение водопадов", icon: "nature" },
  { date: "5 мая", description: "Выезд во Вриндаван", icon: "car" },
  { date: "6 мая", description: "Обзорная экскурсия по Вриндавану. Храмы, священные места", icon: "temple" },
  { date: "7 мая", description: "Вриндаван, посещение храмов", icon: "temple" },
  { date: "8 мая", description: "Выезд в Дели", icon: "car" },
  { date: "9 мая", description: "Вылет домой", icon: "plane-arrival" },
];

// Destinations data - using images from lovable.app
const destinations = [
  {
    name: "Ришикеш",
    image: "/images/rishikesh-new.jpg",
    description: "Мировая столица йоги на берегу священной Ганги в предгорьях Гималаев. Город ашрамов, медитации и духовных практик, где каждый вечер проходит завораживающая церемония Ганга Аарти.",
  },
  {
    name: "Бадринатх",
    image: "/images/badrinath-new.jpg",
    description: "Жемчужина тура! В Сканда Пуране сказано: «Ни одно священное место не сможет сравниться с Бадринатхом ни сейчас, ни в будущем». Священное место для почитателей Вишну.",
  },
  {
    name: "Вриндаван",
    image: "/images/vrindavan-new.jpg",
    description: "Священное место, где проходили земные игры Господа Кришны. Паломничество сюда — уникальная возможность прикоснуться к древним святыням, насчитывающим пять тысяч лет.",
  },
];

// About cards data
const aboutCards = [
  {
    icon: DollarSign,
    title: "130 000 ₽",
    desc: "Ориентировочная стоимость тура. Включает: проживание в ашрамах, питание (завтраки и обеды), все трансферы, экскурсии с гидом, занятия йогой.",
  },
  {
    icon: Mountain,
    title: "Священные места",
    desc: "Ришикеш — столица йоги, Бадринатх — один из четырёх Дхам, Вриндаван — город Кришны. Каждое место наполнено духовной силой и древней историей.",
  },
  {
    icon: Sparkles,
    title: "13 дней",
    desc: "27 апреля — 9 мая 2026. Идеальное время для путешествия: комфортная погода, праздничная атмосфера, цветение рододендронов в горах.",
  },
  {
    icon: Heart,
    title: "Что включено",
    desc: "Трансфер из/в аэропорт Дели, проживание в ашрамах, питание (завтраки и обеды), экскурсии с опытным гидом, занятия йогой, духовные практики.",
  },
  {
    icon: Home,
    title: "Начало и конец",
    desc: "Тур начинается и заканчивается в аэропорту Дели. Встречаем всех участников и провожаем обратно. Групповой трансфер включён.",
  },
  {
    icon: Utensils,
    title: "Доп. расходы",
    desc: "Авиабилеты (~33 000₽), индийская виза (~3 000₽), медицинская страховка (~2 000₽), ужины (~500₽ в день), личные расходы.",
  },
];

// Team members data
const teamMembers = [
  {
    name: "Елена Ишутина",
    image: "/images/elena.png",
    title: "Инструктор йоги, Барнаул",
    description: "Сертифицированный мастер Международного уровня по Хатха, Трай, Аэро, Женской Йоги и Пилатес.",
    imagePosition: "center",
  },
  {
    name: "Татьяна Ткаченко",
    image: "/images/team/tatiana.jpg",
    title: "Тарини Радха даси, Индия",
    description: "Организует приём в Индии. Давно и долго живёт там. Знает все тонкости индийской души.",
    imagePosition: "top",
  },
  {
    name: "Головин Вячеслав",
    image: "/images/team/vyacheslav.jpg",
    title: "Лакшмиканта дас, Индия, Удупи",
    description: "Заядлый путешественник, исколесивший Индию вдоль и поперёк, Тайланд, Непал и Бангладеш.",
    imagePosition: "top",
  },
  {
    name: "Вадим Останин",
    image: "/images/team/vadim.jpg",
    title: "Нанда Гопал дас, Барнаул",
    description: "Учёный, теолог, специалист в области индийской философии. Кандидат философских наук, доцент.",
    imagePosition: "top",
  },
  {
    name: "Алексей Тарнаков",
    image: "/images/team/alexey.jpg",
    title: "Локарам дас, Барнаул",
    description: "Талантливый фотограф, творческий повар и виртуозный музыкант.",
    imagePosition: "top",
  },
];

// Reviews data
const reviews = [
  {
    name: "Анна С.",
    location: "Москва",
    text: "Невероятно! Это путешествие перевернуло мою жизнь! Я приехала другим человеком — нашла своё истинное предназначение. Ганга смыла всё лишнее, и я услышала голос своей души. Божественно! Харе Кришна!🙏🌸",
    rating: 5,
    avatar: "/images/reviewer1.jpg",
  },
  {
    name: "Дмитрий К.",
    location: "Санкт-Петербург",
    text: "Откровение! Годы поиска смысла жизни привели меня в этот тур. Бадринатх открыл мне истину, которую я искал всю жизнь. Потрясающе! Теперь я знаю, зачем пришёл в этот мир. Харе Кришна!🙏🌸",
    rating: 5,
    avatar: "/images/reviewer2.jpg",
  },
  {
    name: "Мария В.",
    location: "Барнаул",
    text: "Вриндаван — это чудо! Моя душа пробудилась! Я поняла, что всю жизнь шла не своим путём. Невероятное чувство! Сейчас я живу в полном соответствии со своим предназначением. Харе Кришна!🙏🌸",
    rating: 5,
    avatar: "/images/reviewer3.jpg",
  },
  {
    name: "Сергей П.",
    location: "Новосибирск",
    text: "Этот тур стал точкой невозврата! Божественное провидение! Старая жизнь осталась позади. Я обрёл ясность, цель и глубокое понимание своего пути. Индия изменила меня навсегда! Харе Кришна!🙏🌸",
    rating: 5,
    avatar: "/images/reviewer4.jpg",
  },
];

// Gallery images - using external tilda images and local images
const galleryImages = [
  "/images/gallery-vrindavan-1.jpg",
  "/images/gallery-vrindavan-2.jpg",
  "/images/gallery-vrindavan-3.jpg",
  "/images/gallery-vrindavan-4.jpg",
  "/images/gallery-vrindavan-5.jpg",
  "https://static.tildacdn.pub/tild3365-3736-4130-a566-376337333666/3_ZJi83bZj5EtHdh6F6n.jpg",
  "https://static.tildacdn.pub/tild6261-3831-4965-b866-336664626232/xfRWqC5uZK-cJ9jd7uGU.jpg",
  "https://static.tildacdn.pub/tild3537-3265-4433-b731-643138303337/khOEw20hHlPDFGYOwt76.jpg",
  "https://static.tildacdn.pub/tild3965-3938-4062-a665-633366326431/epTYs_xx5XHd-PXHuufv.jpg",
  "https://static.tildacdn.pub/tild6635-3439-4733-a361-623863323166/T_fpJO1ee4kzqVkhWVqr.jpg",
  "https://static.tildacdn.pub/tild6638-3938-4136-a238-656362613438/BeVhDZXPWjioSHNE5FcT.jpg",
  "https://static.tildacdn.pub/tild6231-3730-4337-b635-376633383437/Wf8ZNN45hXbiMTZdYerX.jpg",
  "https://static.tildacdn.pub/tild6335-6338-4432-a361-363533623831/_7.jpg",
  "https://static.tildacdn.pub/tild6234-3237-4433-a662-363837333666/65687.jpg",
  "https://static.tildacdn.pub/tild3631-3865-4732-b563-326462303963/65456.jpg",
  "https://static.tildacdn.pub/tild3330-6133-4463-a634-306665646162/5.jpg",
];

// Floating Particles Component
function FloatingParticles() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  
  const height = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  // Pre-generate particles with stable values
  const particles = Array.from({ length: 30 }, (_, i) => ({
    left: (i * 3.33 + Math.random() * 2) % 100,
    bgOpacity: 0.6 + (i % 4) * 0.1,
    shadowSize: 4 + (i % 5),
    shadowOpacity: 0.4 + (i % 4) * 0.15,
    xMove: ((i % 7) - 3.5) * 15,
    duration: 8 + (i % 5),
    delay: i * 0.3,
  }));
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: `-10px`,
            background: `radial-gradient(circle, rgba(218,165,32,${p.bgOpacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${p.shadowSize}px rgba(218,165,32,${p.shadowOpacity})`,
          }}
          animate={{
            y: [0, -height - 100],
            x: [0, p.xMove],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Countdown component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = TOUR_START_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "дней" },
    { value: timeLeft.hours, label: "часов" },
    { value: timeLeft.minutes, label: "минут" },
    { value: timeLeft.seconds, label: "секунд" },
  ];

  return (
    <div className="flex justify-center gap-2 md:gap-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <span className="font-playfair text-xl md:text-2xl font-bold text-white">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-white/50 text-[10px] md:text-xs mt-1.5 tracking-wide">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// Gallery Carousel Component - slides one image at a time
function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % galleryImages.length);
  };

  // Get 3 sequential images starting from currentIndex
  const getVisibleImages = () => {
    const images = [];
    for (let i = 0; i < 3; i++) {
      images.push(galleryImages[(currentIndex + i) % galleryImages.length]);
    }
    return images;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="grid grid-cols-3 gap-3 md:gap-4 overflow-hidden">
        {getVisibleImages().map((img, idx) => (
          <motion.div
            key={`${currentIndex + idx}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={img}
              alt={`Галерея ${idx + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Предыдущие фото"
      >
        <ChevronDown className="w-5 h-5 rotate-90" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Следующие фото"
      >
        <ChevronDown className="w-5 h-5 -rotate-90" />
      </button>
    </div>
  );
}

// Team Carousel Component
function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % teamMembers.length);
  };

  // Get 3 sequential team members
  const visibleMembers = [
    teamMembers[currentIndex % teamMembers.length],
    teamMembers[(currentIndex + 1) % teamMembers.length],
    teamMembers[(currentIndex + 2) % teamMembers.length],
  ];

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {visibleMembers.map((member, idx) => (
          <motion.div
            key={`${currentIndex}-${member.name}`}
            className="relative rounded-2xl overflow-hidden shadow-lg border border-gold/20 hover:shadow-xl transition-shadow duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="relative h-56 md:h-64 lg:h-72">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className={`object-cover ${member.imagePosition === 'center' ? 'object-center' : 'object-top'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 text-center">
              <h3 className="font-playfair text-sm md:text-lg lg:text-xl font-bold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-saffron text-[10px] md:text-xs lg:text-sm font-semibold mb-1 md:mb-2">
                {member.title}
              </p>
              <p className="text-white/80 text-[9px] md:text-xs leading-relaxed line-clamp-2 md:line-clamp-none">
                {member.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Предыдущие участники"
      >
        <ChevronDown className="w-5 h-5 rotate-90" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Следующие участники"
      >
        <ChevronDown className="w-5 h-5 -rotate-90" />
      </button>
    </div>
  );
}

// Reviews Carousel Component
function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 2 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 2) % reviews.length);
  };

  // Get 2 sequential reviews
  const visibleReviews = [
    reviews[currentIndex % reviews.length],
    reviews[(currentIndex + 1) % reviews.length],
  ];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {visibleReviews.map((review, idx) => (
          <motion.div
            key={`${currentIndex}-${review.name}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full bg-card/60 border-border/50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/30">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-playfair font-bold text-foreground">{review.name}</p>
                    <p className="text-muted-foreground text-sm">{review.location}</p>
                  </div>
                </div>
                <p className="text-foreground/80 font-inter text-sm leading-relaxed mb-4">
                  "{review.text}"
                </p>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all shadow-lg"
        aria-label="Предыдущие отзывы"
      >
        <ChevronDown className="w-5 h-5 rotate-90" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all shadow-lg"
        aria-label="Следующие отзывы"
      >
        <ChevronDown className="w-5 h-5 -rotate-90" />
      </button>
    </div>
  );
}

// Contact Modal
function ContactModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-deep-earth border-gold/30 text-white">
        <DialogHeader className="p-6 pb-0">
          <div className="flex justify-between items-center">
            <DialogTitle className="font-playfair text-2xl font-bold text-gradient-gold">
              Забронировать место
            </DialogTitle>
          </div>
          <p className="text-white/60 text-sm mt-2">
            Оставьте заявку, и мы свяжемся с вами
          </p>
        </DialogHeader>

        {submitSuccess ? (
          <div className="p-6 text-center">
            <motion.div
              className="text-5xl mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              ✨
            </motion.div>
            <h3 className="font-playfair text-xl font-bold text-gold mb-2">
              Спасибо за заявку!
            </h3>
            <p className="text-white/70 text-sm">
              Мы свяжемся с вами в ближайшее время
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="modal-name" className="text-white/80 text-sm">
                Ваше имя *
              </Label>
              <Input
                id="modal-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Иван"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-phone" className="text-white/80 text-sm">
                Телефон *
              </Label>
              <Input
                id="modal-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (999) 123-45-67"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-email" className="text-white/80 text-sm">
                Email
              </Label>
              <Input
                id="modal-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ivan@example.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-message" className="text-white/80 text-sm">
                Сообщение
              </Label>
              <Textarea
                id="modal-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Расскажите о ваших ожиданиях..."
                rows={3}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-gold to-saffron text-deep-earth font-semibold py-5 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? (
                "Отправка..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Отправить заявку
                </>
              )}
            </Button>
          </form>
        )}

        <div className="p-6 bg-white/5 border-t border-white/10">
          <p className="text-white/50 text-xs text-center mb-3">Или свяжитесь напрямую:</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 text-sm">
            <a href="tel:+79635038861" className="flex items-center justify-center gap-2 text-gold hover:text-white transition-colors">
              <Phone className="h-4 w-4" />
              +7-963-503-88-61
            </a>
            <a href="mailto:madam.ischutina@mail.ru" className="flex items-center justify-center gap-2 text-gold hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              madam.ischutina@mail.ru
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Program Icon Component
function ProgramIcon({ type, isAnimating }: { type: string; isAnimating: boolean }) {
  const iconClass = "w-5 h-5 md:w-6 md:h-6 text-saffron";
  
  switch (type) {
    case "plane-arrival":
      return (
        <motion.div
          animate={isAnimating ? { x: [-30, 0], opacity: [0, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Plane className={`${iconClass} rotate-[-45deg]`} />
        </motion.div>
      );
    case "plane-departure":
      return (
        <motion.div
          animate={isAnimating ? { y: [0, -5, 0], rotate: [45, 40, 45] } : {}}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        >
          <Plane className={`${iconClass} rotate-45`} />
        </motion.div>
      );
    case "droplets":
      return (
        <motion.div
          animate={isAnimating ? { scale: [0.8, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Droplets className={iconClass} />
        </motion.div>
      );
    case "yoga":
      return (
        <motion.div
          animate={isAnimating ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.6 }}
        >
          <Wind className={iconClass} />
        </motion.div>
      );
    case "car":
      return (
        <motion.div
          animate={isAnimating ? { x: [-20, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Car className={iconClass} />
        </motion.div>
      );
    case "mountain":
      return <Mountain className={iconClass} />;
    case "sun":
      return (
        <motion.div
          animate={isAnimating ? { rotate: 360 } : {}}
          transition={{ duration: 1 }}
        >
          <Sun className={iconClass} />
        </motion.div>
      );
    case "nature":
      return <Leaf className={iconClass} />;
    case "temple":
      return <Church className={iconClass} />;
    default:
      return <Sparkles className={iconClass} />;
  }
}

export default function HomePage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <main className="min-h-screen relative">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Волшебная Индия"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-earth/50 via-deep-earth/40 to-deep-earth/60" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
          {/* Floating Particles */}
          <FloatingParticles />

          {/* Decorative Elements - without emoji */}
          <motion.div
            className="absolute top-20 left-10 w-8 h-8 rounded-full bg-gold/20"
            animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-40 right-20 w-6 h-6 rounded-full bg-saffron/30"
            animate={{ y: [0, -15, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-5 h-5 rounded-full bg-gold/25"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          {/* Hero Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.p
              className="text-white/70 font-inter text-sm md:text-lg tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              27 апреля — 9 мая 2026
            </motion.p>

            <motion.h1
              className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Неизвестные сокровища
              <span className="block text-gradient-gold">Индии</span>
            </motion.h1>

            <motion.p
              className="font-serif text-xl md:text-2xl text-gold italic mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Ришикеш · Бадринатх · Вриндаван
            </motion.p>

            {/* Countdown Section */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-white/60 text-sm mb-3">Волшебство начнётся через</p>
              <CountdownTimer />
              <p className="text-gold font-playfair text-lg md:text-xl mt-4 italic">
                Путешествие мечты
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-gold to-saffron text-deep-earth font-semibold px-8 md:px-10 py-5 md:py-6 rounded-full text-base md:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => setContactModalOpen(true)}
              >
                Забронировать место
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8 text-white/60" />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-background/60 backdrop-blur-md">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-saffron font-inter text-sm tracking-[0.2em] uppercase mb-3">
                О путешествии
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Путешествие к истокам
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-saffron mx-auto mb-6 md:mb-8 rounded-full" />
              <p className="font-inter text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2">
                Ришикеш — город ашрамов и центров йоги на берегу священной реки Ганга в предгорьях Гималаев.
                В эти 13 волшебных дней вас ждёт омовение в Ганге, соприкосновение с величием древних святынь,
                посещение труднодоступного священного города Бадринатх и чудесного города Кришны — Вриндавана.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {aboutCards.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-white/20 bg-white/10 backdrop-blur-xl shadow-lg">
                    <CardContent className="p-4 md:p-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gold to-saffron flex items-center justify-center mb-3 md:mb-4 shadow-lg">
                        <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-deep-earth/60 backdrop-blur-md text-white relative overflow-hidden">
          <div className="absolute inset-0 sacred-pattern opacity-20" />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold font-inter text-sm tracking-[0.2em] uppercase mb-3">
                Священные места
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Жемчужины маршрута
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-saffron mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {destinations.map((dest, index) => (
                <motion.div
                  key={dest.name}
                  className="group rounded-2xl overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-500 hover:shadow-xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-earth/90 via-transparent to-transparent" />
                    <h3 className="absolute bottom-4 left-6 font-playfair text-2xl md:text-3xl font-bold text-gold">
                      {dest.name}
                    </h3>
                  </div>
                  <div className="p-4 md:p-6 bg-white/5 backdrop-blur-sm">
                    <p className="text-white/70 font-inter text-sm leading-relaxed">{dest.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section - Carousel */}
        <section id="gallery" className="py-16 md:py-24 px-4 md:px-6 bg-background/55 backdrop-blur-md">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-saffron font-inter text-sm tracking-[0.2em] uppercase mb-3">
                Фотогалерея
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Мгновения путешествий
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-saffron mx-auto rounded-full" />
            </motion.div>

            <GalleryCarousel />
          </div>
        </section>

        {/* Program Timeline Section */}
        <section id="program" className="py-16 md:py-24 px-4 md:px-6 bg-card/55 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-saffron font-inter text-sm tracking-[0.2em] uppercase mb-3">
                Маршрут
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Программа тура
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-saffron mx-auto rounded-full" />
            </motion.div>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-saffron to-gold md:-translate-x-px" />

              {programData.map((item, index) => (
                <motion.div
                  key={item.date}
                  className={`relative flex items-start mb-6 md:mb-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gold to-saffron border-4 border-background z-10 flex items-center justify-center shadow-lg">
                    <ProgramIcon type={item.icon} isAnimating={true} />
                  </div>

                  <div
                    className={`hidden md:flex w-1/2 ${
                      index % 2 === 0 ? "pr-20 text-right justify-end" : "pl-20 text-left justify-start"
                    } items-center`}
                  >
                    <div className="max-w-md">
                      <div className="font-playfair text-lg font-bold text-saffron">
                        {item.date}
                      </div>
                      <p className="text-white/80 mt-1 font-inter text-sm">{item.description}</p>
                    </div>
                  </div>

                  <div className="md:hidden pl-12">
                    <div className="font-playfair text-base font-bold text-saffron">
                      {item.date}
                    </div>
                    <p className="text-white/80 mt-1 font-inter text-sm">{item.description}</p>
                  </div>

                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-deep-earth/60 backdrop-blur-md text-white relative overflow-hidden">
          <div className="absolute inset-0 sacred-pattern opacity-20" />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold font-inter text-sm tracking-[0.2em] uppercase mb-3">
                Наша команда
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Люди, влюблённые в Индию
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-saffron mx-auto rounded-full" />
            </motion.div>

            <TeamCarousel />
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-background/55 backdrop-blur-md">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-saffron font-inter text-sm tracking-[0.2em] uppercase mb-3">
                Отзывы
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Что говорят путешественники
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-saffron mx-auto rounded-full" />
            </motion.div>

            <ReviewsCarousel />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 md:py-12 px-4 md:px-6 bg-deep-earth/70 backdrop-blur-md border-t border-white/10 text-white relative">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-gradient-gold mb-2">
                  Неизвестные сокровища Индии
                </h3>
                <p className="text-white/50 font-inter text-sm">
                  Духовное путешествие, меняющее судьбу
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                {/* Social Icons Row */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {/* Telegram Chat Button */}
                  <a 
                    href="https://t.me/+rXG-4_Xc8FU5Yjgy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold to-saffron text-deep-earth font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                    Вступить в чат тура
                  </a>
                  
                  <a 
                    href="https://wa.me/79635038861?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C%21%20%D0%9C%D0%B5%D0%BD%D1%8F%20%D0%B7%D0%B0%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D0%BE%D0%B2%D0%B0%D0%BB%20%D1%82%D1%83%D1%80%20%D0%B2%20%D0%A0%D0%B8%D1%88%D0%B8%D0%BA%D0%B5%D1%88." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/50 transition-all"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://t.me/candrachakora81" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/50 transition-all"
                    aria-label="Telegram канал"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </a>
                </div>
                
                {/* Contact Info */}
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-white/60 font-inter text-sm">
                  <a href="tel:+79635038861" className="flex items-center gap-2 hover:text-gold transition-colors">
                    <Phone className="h-4 w-4" />
                    +7-963-503-88-61
                  </a>
                  <a href="mailto:madam.ischutina@mail.ru" className="flex items-center gap-2 hover:text-gold transition-colors">
                    <Mail className="h-4 w-4" />
                    madam.ischutina@mail.ru
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent my-6 md:my-8" />

            {/* Maha Mantra */}
            <div className="text-center mb-6">
              <p className="text-gold/80 font-inter text-xs md:text-sm leading-relaxed">
                🌸 Харе Кришна Харе Кришна Кришна Кришна Харе Харе 🌸
              </p>
              <p className="text-gold/80 font-inter text-xs md:text-sm leading-relaxed mt-1">
                🌸 Харе Рама Харе Рама Рама Рама Харе Харе 🌸
              </p>
            </div>

            <div className="text-center text-white/40 font-inter text-xs md:text-sm">
              <p>© 2026 Тур в Индию. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Contact Modal */}
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </main>
  );
}
