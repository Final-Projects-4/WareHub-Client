import { Box, Flex, Text, Button, Collapse } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { FiBox } from "react-icons/fi";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";

const AnimatedNumber = ({ value, text }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const valueRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      valueRef.current += 3;
      if (valueRef.current >= value) {
        valueRef.current = value;
        clearInterval(intervalId);
      }
      setAnimatedValue(valueRef.current);
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [value]);

  return (
    <Box mr={4} textAlign="left">
      <Text fontSize="4xl" fontWeight="bold">
        {animatedValue}
      </Text>
      <Text>{text}</Text>
    </Box>
  );
};

const Landing = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Box bg="#202626" color="white" py={16} px={0} position={"absolute"}>
      {/* Header */}
      <Flex justify="space-between" align="center" p={4}>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Flex align="center" pr={2} mx={10}>
            <Box as={FiBox} color="gray.600" alt="Warehub Logo" height={24} />
            <Text fontSize="2xl" fontWeight="bold" mt={5} mb={6} ml={6}>
              Warehub
            </Text>
          </Flex>
        </motion.div>
      </Flex>

      {/* Navbar */}
      <Flex justify="flex-end" align="center" p={-10} mt={-20}>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="fitur" smooth={true} duration={500}>
            <Button
              variant="link"
              color="white"
              _hover={{ color: "gray.300" }}
              mx={2}
              mr={10}
            >
              Fitur
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="layanan" smooth={true} duration={500}>
            <Button
              variant="link"
              color="white"
              _hover={{ color: "gray.300" }}
              mx={2}
              mr={10}
            >
              Layanan
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="tentang-kami" smooth={true} duration={500}>
            <Button
              variant="link"
              color="white"
              _hover={{ color: "gray.300" }}
              mx={2}
              mr={10}
            >
              Tentang Kami
            </Button>
          </Link>
        </motion.div>
      </Flex>

      {/* Section 1 */}
      <Box bg="#202626" color="white" py={16} px={8}>
        <Flex justify="space-between">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box>
              <Text fontSize="lg" mt={4} mb={8}>
                solusi lengkap manajemen gudang untuk bisnis Anda. Kami adalah
                tim yang berkomitmen untuk membantu Anda mengoptimalkan operasi
                gudang Anda.
              </Text>
              <Button colorScheme="blue" mt={8} bg="#0F3DD1">
                Gratis Coba 1 Bulan
              </Button>
              <Flex justify="flex-start" align="center" mt={8}>
                <AnimatedNumber value={100} text="Brand Owner" />
                <AnimatedNumber value={100} text="User Active" />
                <AnimatedNumber value={100} text="Partner" />
              </Flex>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box position="relative" width={500} height={400}>
              <img
                src="/dummy-web-admin.png"
                alt="Dummy Web Admin"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Box>
          </motion.div>
        </Flex>
      </Box>

      {/* Section 2 */}
      <Box bg="#0F3DD1" py={10} px={0} mx={0}>
        <Text fontSize="2xl" color="white" textAlign="center" mb={8}>
          Brand-Brand yang mempercayai kami
        </Text>
        <Flex maxWidth="100%" justifyContent="center">
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="https://logodix.com/logo/814217.png"
              alt="Company Logo 1"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="https://i.pinimg.com/originals/d4/f2/5b/d4f25b4b1480eaaa2ae85868356f1b29.png"
              alt="Company Logo 2"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="https://logos-world.net/wp-content/uploads/2020/07/Asus-Logo.png"
              alt="Company Logo 3"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="https://logos-world.net/wp-content/uploads/2020/09/Lakme-Logo-2011-2019.png"
              alt="Company Logo 4"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="https://www.cetoday.ch/sites/default/files/inline-images/Eiger-logo-black.png"
              alt="Company Logo 5"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="center" mx={4}>
            <img
              src="http://lofrev.net/wp-content/photos/2016/08/lacoste_vector_logo.png"
              alt="Company Logo 6"
              style={{
                width: "100px",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </Flex>
        </Flex>
      </Box>

      {/* Section 3 */}
      <Box py={16} px={8} bg="#F5FAFE" id="fitur">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          mb={8}
          color="black"
          textAlign="center"
        >
          Fitur menguntungkan menggunakan Warehub
        </Text>
        <Flex justify="space-between">
          {/* Card 1 */}
          <Flex justify="space-between">
            {/* Card 1 */}
            <Box
              w="30%"
              bg="#FFFFFF"
              p={4}
              rounded="md"
              boxShadow="md"
              transition="background-color 0.3s"
            >
              <Text fontSize="xl" fontWeight="bold" color="black" mb={4}>
                Peningkatan Efisiensi Operasional
              </Text>
              <Text color="gray.600" lineHeight="tall" mb={4}>
                Membantu meningkatkan efisiensi operasional gudang Anda melalui
                pemantauan stok real-time, pemrosesan pesanan yang
                terotomatisasi, dan integrasi dengan sistem lain
              </Text>
              <FontAwesomeIcon
                icon={faListCheck}
                style={{ color: "#2e35ff", fontSize: "2rem", margin: "0 auto" }}
              />
            </Box>

            {/* Card 2 */}
            <Box
              w="30%"
              bg="#FFFFFF"
              p={4}
              rounded="md"
              boxShadow="md"
              transition="background-color 0.3s"
            >
              <Text fontSize="xl" fontWeight="bold" color="black" mb={4}>
                Akurasi dan Ketepatan Data
              </Text>
              <Text color="gray.600" lineHeight="tall" mb={4}>
                Anda dapat memastikan akurasi dan ketepatan data yang tinggi
                dalam pelacakan inventaris. Hal ini mengurangi risiko kesalahan
                manusia, kehilangan stok, dan kesalahan pengiriman
              </Text>
              <FontAwesomeIcon
                icon={faBullseye}
                style={{ color: "#2e35ff", fontSize: "2rem", margin: "0 auto" }}
              />
            </Box>

            {/* Card 3 */}
            <Box
              w="30%"
              bg="#FFFFFF"
              p={4}
              rounded="md"
              boxShadow="md"
              transition="background-color 0.3s"
            >
              <Text fontSize="xl" fontWeight="bold" color="black" mb={4}>
                Analisis dan Pengambilan Keputusan
              </Text>
              <Text color="gray.600" lineHeight="tall" mb={4}>
                Menyediakan laporan dan analisis yang membantu pengambilan
                keputusan yang lebih baik. Anda dapat melihat tren permintaan
                produk, mengidentifikasi produk yang paling laris.
              </Text>
              <FontAwesomeIcon
                icon={faChartSimple}
                style={{ color: "#2e35ff", fontSize: "2rem", margin: "0 auto" }}
              />
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* Section 4 */}
      <Box py={16} px={8} bg="#F5FAFE" id="layanan">
        <Flex justify="center" align="center">
          {/* Left side */}
          <Box w="50%" color="black">
            <Text fontSize="2xl" fontWeight="bold" textAlign="left">
              Manajemen Inventaris yang Efisien
            </Text>
            <Text mt={4} textAlign="left">
              Warehub menyediakan fitur manajemen inventaris yang memungkinkan
              pengguna untuk melacak stok barang, mengatur kategori produk, dan
              memantau pergerakan inventaris secara real-time
            </Text>
          </Box>

          {/* Right side */}
          <Box w="50%">
            <Flex justify="center">
              <img
                src="https://cdn.dribbble.com/users/1111091/screenshots/15039638/media/f1230349a9446f5d271903d5c8219e79.jpg?compress=1&resize=1200x900"
                alt="Dashboard Admin"
                style={{ width: "50%" }}
              />
            </Flex>
          </Box>
        </Flex>
      </Box>

      {/* Section 5 */}
      <Box py={16} px={8} bg="#F5FAFE">
        <Flex justify="center" align="center">
          {/* Right side */}
          <Box w="50%">
            <Flex justify="center">
              <img
                src="https://cdn.dribbble.com/users/881900/screenshots/10492582/inventory_dashboard_4x.jpg"
                alt="Dashboard Admin"
                style={{ width: "50%" }}
              />
            </Flex>
          </Box>

          {/* Left side */}
          <Box w="50%" color="black">
            <Text fontSize="2xl" fontWeight="bold" textAlign="left">
              Memantau Stok Produk dan Transaksi
            </Text>
            <Text mt={4} textAlign="left">
              pengguna dapat melacak transaksi yang terjadi terkait dengan
              produk mereka. Informasi yang dapat diakses meliputi detail
              pembelian, penjualan, dan pengiriman produk. Dengan melacak
              transaksi, pengguna dapat memperoleh pemahaman yang lebih baik
              tentang aktivitas bisnis mereka, termasuk pola penjualan,
              popularitas produk, dan tren permintaan.
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* Section 6 */}
      <Box py={16} px={8} bg="#0F3DD1" id="tentang-kami">
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Tentang kami
        </Text>
        {/* Display dropdown questions and their answers */}
        <Accordion allowToggle mt={8}>
          {/* Question 1 */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text color="white" fontWeight="bold">
                    Apa itu Warehub?
                  </Text>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text color="white">
                Warehub adalah platform e-commerce yang menyediakan solusi
                pemasaran, manajemen inventaris, dan logistik untuk bisnis
                online.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          {/* Question 2 */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text color="white" fontWeight="bold">
                    Bagaimana cara mendaftar di Warehub?
                  </Text>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text color="white">
                Anda dapat mendaftar di Warehub dengan mengunjungi situs web
                resmi kami dan mengikuti langkah-langkah pendaftaran yang
                disediakan.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          {/* Question 3 */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text color="white" fontWeight="bold">
                    Apa keuntungan menggunakan Warehub?
                  </Text>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text color="white">
                Keuntungan menggunakan Warehub antara lain akses ke berbagai
                layanan logistik, manajemen inventaris yang efisien, dan
                integrasi dengan platform pemasaran untuk meningkatkan
                penjualan.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          {/* Question 4 */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text color="white" fontWeight="bold">
                    Bagaimana proses pengiriman barang dengan Warehub?
                  </Text>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text color="white">
                Setelah Anda menerima pesanan, Warehub akan mengurus proses
                pengemasan dan pengiriman barang kepada pelanggan Anda melalui
                jasa logistik yang terhubung dengan platform.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          {/* Question 5 */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text color="white" fontWeight="bold">
                    Apakah Warehub memiliki fitur pelacakan pengiriman?
                  </Text>
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text color="white">
                Ya, Warehub menyediakan fitur pelacakan pengiriman yang
                memungkinkan Anda dan pelanggan untuk melacak status pengiriman
                barang secara real-time.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      {/* Footer */}
      <Box py={2} px={6} bg="#202626">
        <Flex justify="center">
          <Box mr={8}>
            <Flex align="center" pr={2} mx={10}>
              <Box as={FiBox} color="gray.600" alt="Warehub Logo" height={24} />
              <Text fontSize="2xl" fontWeight="bold" mt={5} mb={6} ml={6}>
                Warehub
              </Text>
            </Flex>
          </Box>
          <Box>
            <Box mt={7} textAlign="center">
              <a href="mailto:info@warehub.com">
                <Button colorScheme="blue" bg="#0F3DD1">
                  Hubungi Kami
                </Button>
              </a>
            </Box>
          </Box>
        </Flex>
        <Text mt={8} ml={4} fontSize="sm" textAlign="center" color="gray.400">
          ©2023. Hak Cipta Dilindungi.
        </Text>
      </Box>
    </Box>
  );
};

export default Landing;
