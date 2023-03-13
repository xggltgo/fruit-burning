/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 80027
Source Host           : localhost:3306
Source Database       : fruit-burning

Target Server Type    : MYSQL
Target Server Version : 80027
File Encoding         : 65001

Date: 2023-03-13 23:26:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of address
-- ----------------------------

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `loginId` varchar(255) NOT NULL,
  `loginPwd` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', '管理员', 'admin', 'e10adc3949ba59abbe56e057f20f883e');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `checked` tinyint(1) NOT NULL DEFAULT '0',
  `createDate` varchar(255) NOT NULL,
  `userid` int DEFAULT NULL,
  `productid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `productid` (`productid`),
  CONSTRAINT `cart_ibfk_401` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `cart_ibfk_402` FOREIGN KEY (`productid`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of cart
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `count` int NOT NULL,
  `order` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '苹果', '4', '3');
INSERT INTO `category` VALUES ('2', '桃子', '3', '1');
INSERT INTO `category` VALUES ('3', '蓝莓', '4', '4');
INSERT INTO `category` VALUES ('4', '柚子', '3', '2');
INSERT INTO `category` VALUES ('5', '石榴', '3', '5');
INSERT INTO `category` VALUES ('6', '猕猴桃', '4', '6');
INSERT INTO `category` VALUES ('7', '香蕉', '3', '7');
INSERT INTO `category` VALUES ('8', '葡萄', '3', '8');
INSERT INTO `category` VALUES ('9', '草莓', '4', '9');
INSERT INTO `category` VALUES ('10', '车厘子/樱桃', '3', '10');
INSERT INTO `category` VALUES ('11', '火龙果', '3', '11');
INSERT INTO `category` VALUES ('12', '西瓜', '4', '12');
INSERT INTO `category` VALUES ('13', '山竹', '3', '13');
INSERT INTO `category` VALUES ('14', '龙眼/桂圆', '4', '14');
INSERT INTO `category` VALUES ('15', '柠檬', '3', '15');
INSERT INTO `category` VALUES ('16', '荔枝', '4', '16');
INSERT INTO `category` VALUES ('17', '菠萝/凤梨', '3', '17');
INSERT INTO `category` VALUES ('18', '牛油果', '3', '18');
INSERT INTO `category` VALUES ('19', '李子', '3', '19');
INSERT INTO `category` VALUES ('20', '梨', '4', '20');
INSERT INTO `category` VALUES ('21', '树莓', '3', '21');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment` decimal(10,2) NOT NULL,
  `payType` tinyint(1) DEFAULT NULL,
  `status` int NOT NULL,
  `createTime` varchar(255) NOT NULL,
  `payTime` varchar(255) DEFAULT NULL,
  `sendTime` varchar(255) DEFAULT NULL,
  `endTime` varchar(255) DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `receiveid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `receiveid` (`receiveid`),
  CONSTRAINT `order_ibfk_297` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_298` FOREIGN KEY (`receiveid`) REFERENCES `receive` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('1', '72.60', null, '1', '1677949560229', null, null, null, '1', '1');
INSERT INTO `order` VALUES ('2', '155.40', null, '0', '1678002415683', null, null, null, '1', '1');
INSERT INTO `order` VALUES ('3', '51.80', '0', '2', '1678003576043', '1678003586526', null, null, '1', '1');
INSERT INTO `order` VALUES ('4', '155.40', '0', '2', '1678023494978', '1678025320867', null, null, '1', '1');
INSERT INTO `order` VALUES ('5', '919.00', null, '1', '1678031674017', null, null, null, '1', '1');
INSERT INTO `order` VALUES ('6', '662.10', null, '0', '1678168741501', null, null, null, '1', '1');
INSERT INTO `order` VALUES ('7', '168.00', '0', '2', '1678170189516', '1678170192038', null, null, '1', '1');
INSERT INTO `order` VALUES ('8', '316.00', '0', '2', '1678349340183', '1678349511869', null, null, '1', '1');
INSERT INTO `order` VALUES ('9', '402.40', null, '1', '1678437129143', null, null, null, '1', '1');
INSERT INTO `order` VALUES ('10', '65.60', null, '1', '1678437189797', null, null, null, '1', '1');
INSERT INTO `order` VALUES ('11', '32.80', '1', '2', '1678439551595', '1678441338170', null, null, '1', '1');
INSERT INTO `order` VALUES ('12', '51.80', null, '0', '1678454201552', null, null, null, '1', '1');
INSERT INTO `order` VALUES ('13', '268.00', null, '1', '1678454555826', null, null, null, '1', '3');
INSERT INTO `order` VALUES ('14', '32.80', '1', '2', '1678465007772', '1678465058248', null, null, '1', '1');
INSERT INTO `order` VALUES ('15', '268.00', null, '0', '1678511638229', null, null, null, '1', '1');
INSERT INTO `order` VALUES ('16', '298.80', null, '1', '1678511809093', null, null, null, '1', '3');
INSERT INTO `order` VALUES ('17', '274.80', '0', '2', '1678687250099', '1678687310194', null, null, '1', '6');
INSERT INTO `order` VALUES ('18', '181.60', '0', '2', '1678689592350', '1678689605668', null, null, '1', '1');

-- ----------------------------
-- Table structure for orderdetail
-- ----------------------------
DROP TABLE IF EXISTS `orderdetail`;
CREATE TABLE `orderdetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productCount` int NOT NULL,
  `productid` int DEFAULT NULL,
  `orderid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orderDetail_orderid_productid_unique` (`productid`,`orderid`),
  KEY `orderid` (`orderid`),
  CONSTRAINT `orderdetail_ibfk_361` FOREIGN KEY (`productid`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderdetail_ibfk_362` FOREIGN KEY (`orderid`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of orderdetail
-- ----------------------------
INSERT INTO `orderdetail` VALUES ('1', '1', '5', '1');
INSERT INTO `orderdetail` VALUES ('2', '1', '3', '1');
INSERT INTO `orderdetail` VALUES ('3', '3', '2', '2');
INSERT INTO `orderdetail` VALUES ('4', '1', '2', '3');
INSERT INTO `orderdetail` VALUES ('5', '3', '2', '4');
INSERT INTO `orderdetail` VALUES ('6', '3', '3', '5');
INSERT INTO `orderdetail` VALUES ('7', '12', '2', '5');
INSERT INTO `orderdetail` VALUES ('8', '5', '5', '5');
INSERT INTO `orderdetail` VALUES ('9', '5', '1', '6');
INSERT INTO `orderdetail` VALUES ('10', '7', '2', '6');
INSERT INTO `orderdetail` VALUES ('11', '3', '6', '7');
INSERT INTO `orderdetail` VALUES ('12', '2', '9', '8');
INSERT INTO `orderdetail` VALUES ('13', '1', '5', '9');
INSERT INTO `orderdetail` VALUES ('14', '7', '2', '9');
INSERT INTO `orderdetail` VALUES ('15', '2', '3', '10');
INSERT INTO `orderdetail` VALUES ('16', '1', '3', '11');
INSERT INTO `orderdetail` VALUES ('17', '1', '2', '12');
INSERT INTO `orderdetail` VALUES ('18', '1', '8', '13');
INSERT INTO `orderdetail` VALUES ('19', '1', '3', '14');
INSERT INTO `orderdetail` VALUES ('20', '1', '8', '15');
INSERT INTO `orderdetail` VALUES ('21', '1', '11', '16');
INSERT INTO `orderdetail` VALUES ('22', '3', '2', '17');
INSERT INTO `orderdetail` VALUES ('23', '3', '7', '17');
INSERT INTO `orderdetail` VALUES ('24', '2', '2', '18');
INSERT INTO `orderdetail` VALUES ('25', '1', '15', '18');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '-1',
  `price` decimal(10,2) NOT NULL,
  `image_sm` varchar(255) NOT NULL,
  `image_mid` varchar(255) NOT NULL,
  `image_big` varchar(255) NOT NULL,
  `stock` int NOT NULL,
  `createDate` varchar(255) NOT NULL,
  `categoryid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryid` (`categoryid`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryid`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', '新疆阿克苏冰糖心苹果红富士新鲜水果时令 中果净果8.5礼盒装', '商品描述信息', '1', '59.90', '/static/upload/苹果1sm.png', '/static/upload/苹果1mid.png', '/static/upload/raspberry_big.png', '100', '1677861298696', '1');
INSERT INTO `product` VALUES ('2', '云南蓝莓当季现摘国产生新鲜大水果 蓝莓大果125g*2盒（18-20mm）', '商品描述信息', '0', '51.80', '/static/upload/蓝莓3sm.png', '/static/upload/蓝莓3mid.png', '/static/upload/raspberry_big.png', '20', '1677917495833', '3');
INSERT INTO `product` VALUES ('3', '甘肃天水花牛蛇果苹果 新鲜苹果水果整箱 净重5斤大果（75-80mm）', '商品描述信息', '1', '32.80', '/static/upload/苹果4sm.png', '/static/upload/苹果4mid.png', '/static/upload/raspberry_big.png', '39', '1677861406399', '1');
INSERT INTO `product` VALUES ('5', '南非红心西柚爆汁红肉柚子纯甜红柚子 8个南非红心西柚200-300g/个', '精选进口红心柚，原产地采摘，颗颗好果。', '2', '39.80', '/static/upload/柚子1mid.png', '/static/upload/柚子1sm.png', '/static/upload/raspberry_big.png', '58', '1677861407234', '4');
INSERT INTO `product` VALUES ('6', '无锡水蜜桃阳山新鲜正宗尝鲜装500g（不含礼盒）', '商品描述信息', '1', '56.00', '/static/upload/桃子1sm.png', '/static/upload/桃子1mid.png', '/static/upload/raspberry_big.png', '20', '1677861408170', '2');
INSERT INTO `product` VALUES ('7', '突尼斯软籽石榴四川会理软子红心无籽石榴【品质装】6-7两 净重2斤多', '朱唇榴齿香甜多汁果味浓郁籽仁细小柔软不用吐籽，富含自然水果', '2', '39.80', '/static/upload/石榴1sm.png', '/static/upload/石榴1mid.png', '/static/upload/raspberry_big.png', '66', '1677861409022', '5');
INSERT INTO `product` VALUES ('8', '无锡水蜜桃礼盒装 新鲜白凤桃子8个礼盒装【单果4-5两】', '商品描述信息', '2', '268.00', '/static/upload/桃子2sm.png', '/static/upload/桃子2mid.png', '/static/upload/raspberry_big.png', '30', '1677861409875', '2');
INSERT INTO `product` VALUES ('9', '西双版纳白糖葡萄柚蜂蜜柚新鲜应季水果 6颗【礼盒装】 约3000克', '商品描述信息', '1', '158.00', '/static/upload/柚子2sm.png', '/static/upload/柚子2mid.png', '/static/upload/raspberry_big.png', '50', '1677861410643', '4');
INSERT INTO `product` VALUES ('10', '常山大胡柚特产新鲜柚子蜜生鲜水果礼盒时令10斤较划算 大果', '商品描述信息', '2', '128.00', '/static/upload/柚子3sm.png', '/static/upload/柚子3mid.png', '/static/upload/raspberry_big.png', '48', '1677861411445', '4');
INSERT INTO `product` VALUES ('11', '蓝莓 Driscoll\'s  蓝莓大果 限定巨无霸果（22mm＋） 6盒实惠装', '商品描述信息', '1', '298.80', '/static/upload/蓝莓2sm.png', '/static/upload/蓝莓2mid.jpg', '/static/upload/raspberry_big.png', '50', '1677917435590', '3');
INSERT INTO `product` VALUES ('13', '洛川苹果陕西红富士9斤 礼盒装 一级中果 单果160g以上', '商品描述信息', '0', '69.90', '/static/upload/苹果3sm.png', '/static/upload/苹果3mid.png', '/static/upload/raspberry_big.png', '47', '1677861405420', '1');
INSERT INTO `product` VALUES ('14', '阳光玫瑰葡萄 晴王香印青提水果礼盒 特级果4斤礼盒装（单果12g+）', '商品描述信息', '1', '159.90', '/static/upload/葡萄1sm.png', '/static/upload/葡萄1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '8');
INSERT INTO `product` VALUES ('15', '云南蒙自甜石榴 水晶薄皮甜石榴新鲜水果特大果(单果350-450g) 6斤', '商品描述信息', '0', '78.00', '/static/upload/石榴2sm.png', '/static/upload/石榴2mid.png', '/static/upload/raspberry_big.png', '66', '1677861336781', '5');
INSERT INTO `product` VALUES ('16', '四川蒲江红心猕猴桃 国产奇异果特大  弥猕桃维C 大果(70-90g)15个', '商品描述信息', '1', '27.39', '/static/upload/猕猴桃1sm.png', '/static/upload/猕猴桃1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '6');
INSERT INTO `product` VALUES ('17', '绿心猕猴桃 严选大果24枚彩箱装（单果90-110g）陕西奇异果', '商品描述信息', '2', '49.90', '/static/upload/猕猴桃2sm.png', '/static/upload/猕猴桃2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '6');
INSERT INTO `product` VALUES ('18', '广西小米蕉新鲜水果当季现摘小米香蕉应季小芭蕉热带水果整箱 9斤', '商品描述信息', '1', '24.80', '/static/upload/香蕉1sm.png', '/static/upload/香蕉1mid.png', '/static/upload/raspberry_big.png', '89', '1677861336781', '7');
INSERT INTO `product` VALUES ('19', '云南大香蕉当季新鲜水果薄皮香蕉自然熟高山香蕉高山甜蕉带箱10斤 ', '商品描述信息', '0', '19.80', '/static/upload/香蕉2sm.png', '/static/upload/香蕉2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '7');
INSERT INTO `product` VALUES ('20', '烟台苹果栖霞红富士新鲜水果生鲜山东特产脆甜 5斤 一级大果90', '商品描述信息', '1', '32.90', '/static/upload/苹果2sm.png', '/static/upload/苹果2mid.png', '/static/upload/raspberry_big.png', '50', '1677861336781', '1');
INSERT INTO `product` VALUES ('21', '云南夏黑葡萄 严选3斤装 无籽葡萄水果 新鲜水果提子', '商品描述信息', '2', '69.90', '/static/upload/葡萄2sm.png', '/static/upload/葡萄2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '8');
INSERT INTO `product` VALUES ('22', '奶油草莓 约重500g/15-24颗大果 新鲜水果', '商品描述信息', '1', '49.90', '/static/upload/草莓1sm.png', '/static/upload/草莓1mid.jpg', '/static/upload/raspberry_big.png', '89', '1677861336781', '9');
INSERT INTO `product` VALUES ('23', '淡雪草莓 奶油白色草莓 淡雪草莓(纯白天使款) 大果2斤（15粒X4盒）', '商品描述信息', '2', '269.00', '/static/upload/草莓2sm.png', '/static/upload/草莓2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '9');
INSERT INTO `product` VALUES ('24', '智力车厘子进口大樱桃生鲜水果 2盒【精选XL级】 500g', '商品描述信息', '0', '49.90', '/static/upload/樱桃1sm.png', '/static/upload/樱桃1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '10');
INSERT INTO `product` VALUES ('25', '黄金车厘子樱桃黄车厘子新鲜雷尼尔水晶 1000g 大果(30-32mm)', '商品描述信息', '2', '279.90', '/static/upload/樱桃2sm.png', '/static/upload/樱桃2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '10');
INSERT INTO `product` VALUES ('27', '云南西双版纳红心火龙果 6个装 中果 单果300g以上 生鲜水果', '商品描述信息', '1', '36.90', '/static/upload/火龙果1sm.png', '/static/upload/火龙果1mid.png', '/static/upload/raspberry_big.png', '89', '1677861336781', '11');
INSERT INTO `product` VALUES ('28', '越南进口白心火龙果 4个装 大果 单果400-500g 生鲜水果', '商品描述信息', '2', '29.90', '/static/upload/火龙果2sm.png', '/static/upload/火龙果2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '11');
INSERT INTO `product` VALUES ('29', '广西黑美人西瓜 新鲜9-10斤水果薄皮沙瓤甜瓜带箱 4.5-5斤', '商品描述信息', '1', '23.10', '/static/upload/西瓜1sm.png', '/static/upload/西瓜1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '12');
INSERT INTO `product` VALUES ('30', '海南冰糖麒麟西瓜 现摘西瓜当季水果脆皮薄皮西瓜（约5-6斤箱装）', '商品描述信息', '2', '65.00', '/static/upload/西瓜2sm.png', '/static/upload/西瓜2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '12');
INSERT INTO `product` VALUES ('31', '印尼进口山竹 5A级大果 1kg装 单果约80-110g 新鲜水果', '商品描述信息', '0', '79.90', '/static/upload/山竹1sm.png', '/static/upload/山竹1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '13');
INSERT INTO `product` VALUES ('32', '山竹泰国进口6A级新鲜热带水果当季新鲜 净重3斤 5A特大果', '商品描述信息', '2', '99.90', '/static/upload/山竹2sm.png', '/static/upload/山竹2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '13');
INSERT INTO `product` VALUES ('33', '牛油果 进口酪梨 鳄梨 巨无霸新鲜水果 中果/果重130-150g 4个装', '商品描述信息', '1', '86.00', '/static/upload/牛油果1sm.png', '/static/upload/牛油果1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '18');
INSERT INTO `product` VALUES ('34', '墨西哥进口牛油果  新鲜鳄梨超大果 大果4枚 单枚150-180g', '商品描述信息', '2', '44.82', '/static/upload/牛油果2sm.png', '/static/upload/牛油果2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '18');
INSERT INTO `product` VALUES ('35', '泰国进口龙眼 精选一级果 1.5kg装 生鲜水果', '商品描述信息', '0', '44.90', '/static/upload/龙眼1sm.png', '/static/upload/龙眼1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '14');
INSERT INTO `product` VALUES ('36', '漳州石硖龙眼新鲜果新鲜当季现摘桂圆整箱 1斤 大果', '商品描述信息', '2', '25.90', '/static/upload/龙眼2sm.png', '/static/upload/龙眼2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '14');
INSERT INTO `product` VALUES ('37', '海南小金桔水果新鲜柠檬果小青桔青柠5斤 9-20g-中大果', '商品描述信息', '1', '30.00', '/static/upload/柠檬1sm.png', '/static/upload/柠檬1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '15');
INSERT INTO `product` VALUES ('38', '四川安岳黄柠檬 5斤装 单果60-90g 产地直发', '商品描述信息', '2', '19.90', '/static/upload/柠檬2sm.png', '/static/upload/柠檬2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '15');
INSERT INTO `product` VALUES ('39', '手指柠檬澳洲指橙美国出口稀有水果澳大利亚新鲜青柠檬鱼子酱40g', '商品描述信息', '2', '59.00', '/static/upload/柠檬3sm.png', '/static/upload/柠檬3mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '15');
INSERT INTO `product` VALUES ('40', '海南妃子笑荔枝新鲜速冻荔枝冷冻荔枝 清甜多汁 1斤精选装', '商品描述信息', '2', '29.00', '/static/upload/荔枝1sm.png', '/static/upload/荔枝1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '16');
INSERT INTO `product` VALUES ('41', '泰国红毛丹新鲜当季热带水果海南毛荔枝净重 1500g', '商品描述信息', '2', '98.00', '/static/upload/荔枝2sm.png', '/static/upload/荔枝2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '16');
INSERT INTO `product` VALUES ('42', '香水菠萝当季应季新鲜水果广东湛江 5斤小果 3-5颗装', '商品描述信息', '1', '32.80', '/static/upload/菠萝1sm.png', '/static/upload/菠萝1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '17');
INSERT INTO `product` VALUES ('43', '泰国小菠萝 迷你菠萝去皮小凤梨热带水果 3斤装【约3-6个/斤】', '商品描述信息', '2', '69.90', '/static/upload/菠萝2sm.png', '/static/upload/菠萝2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '17');
INSERT INTO `product` VALUES ('44', '海南金钻凤梨中果8斤(4-6个) 新鲜热带水果 金菠萝凤梨 ', '商品描述信息', '0', '46.90', '/static/upload/菠萝3sm.png', '/static/upload/菠萝3mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '17');
INSERT INTO `product` VALUES ('45', '智利进口凤凰李子 2斤装 李子 血丝李 生鲜水果', '商品描述信息', '1', '78.90', '/static/upload/李子1sm.png', '/static/upload/李子1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '19');
INSERT INTO `product` VALUES ('47', '李子新鲜现货水果三月青李珍珠李当季酸脆李子三月李1斤装', '商品描述信息', '2', '38.00', '/static/upload/李子2sm.png', '/static/upload/李子2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '19');
INSERT INTO `product` VALUES ('48', '辽宁南国梨南果梨香水梨醉梨酒香梨礼盒5斤大果24枚经典装', '商品描述信息', '0', '28.40', '/static/upload/梨1sm.png', '/static/upload/梨1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '20');
INSERT INTO `product` VALUES ('49', '新疆库尔勒香梨2.5kg 单果80-100g以上 生鲜水果', '商品描述信息', '1', '39.90', '/static/upload/梨2sm.png', '/static/upload/梨2mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '20');
INSERT INTO `product` VALUES ('50', '现摘红树莓水果即食酸甜覆盆子鲜果 5A级黑树莓 2盒装【110g/盒】', '商品描述信息', '1', '98.00', '/static/upload/树莓1sm.png', '/static/upload/树莓1mid.png', '/static/upload/raspberry_big.png', '76', '1677861336781', '21');
INSERT INTO `product` VALUES ('51', '新鲜云南树莓红树莓山莓大果 22mm及以上 125g/盒 4盒', '商品描述信息', '2', '158.00', '/static/upload/树莓2sm.png', '/static/upload/树莓2mid.png', '/static/upload/树莓2mid.png', '76', '1677861336781', '21');

-- ----------------------------
-- Table structure for receive
-- ----------------------------
DROP TABLE IF EXISTS `receive`;
CREATE TABLE `receive` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `county` varchar(255) NOT NULL,
  `detailAddress` varchar(255) NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  `userid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `receive_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of receive
-- ----------------------------
INSERT INTO `receive` VALUES ('1', '哎呀', '19982638873', '110000', '110101', '110101', '无', '0', '1');
INSERT INTO `receive` VALUES ('2', 'llkk', '1580600498', '110000', '110101', '110103', 'kjih5454', '0', '4');
INSERT INTO `receive` VALUES ('3', 'ls', '1232323', '110000', '110101', '110103', '121', '0', '1');
INSERT INTO `receive` VALUES ('6', 'sj', '15487625436', '140000', '140300', '140311', '123', '0', '1');
INSERT INTO `receive` VALUES ('21', 'xiao3', '3', '150000', '150400', '150421', '3', '0', '1');
INSERT INTO `receive` VALUES ('22', 'at', '12345678987', '140000', '140400', '140424', '123', '1', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL,
  `loginId` varchar(255) NOT NULL,
  `loginPwd` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT '/static/avatar/default.png',
  `cartCount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'aer', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '2345788923', '/static/upload/rc108z-1678689652875.jpg', '0');
INSERT INTO `user` VALUES ('2', 'niki', 'niki', '25f9e794323b453885f5181f1b624d0b', null, '/static/avatar/default.png', '0');
INSERT INTO `user` VALUES ('3', 'niki1', 'niki1', 'e807f1fcf82d132f9bb018ca6738a19f', null, '/static/avatar/default.png', '0');
INSERT INTO `user` VALUES ('4', 'llllll', '1', 'c4ca4238a0b923820dcc509a6f75849b', '15680804562', '/static/upload/2g7suf-1678265194036.jpg', '0');
INSERT INTO `user` VALUES ('5', '11', '11', '6512bd43d9caa6e02c990b0a82652dca', null, '/static/avatar/default.png', '0');
