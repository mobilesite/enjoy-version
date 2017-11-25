/**
 * 获取浏览设备相关信息的工具方法
 * @exports lib/enjoy-version
 * @author mobilesite
 * @email mobilesite@163.com
 * @since 2017-11-25
 */

import pkg from '../package.json';

export class Version {
    static compare(version1, version2) {
        const v1 = version1.toString().split('.');
        const v2 = version2.toString().split('.');
        const maxLen = Math.max(v1.length, v2.length);

        for (let i = 0; i < maxLen; i++) {
            let n1 = parseInt(v1[i], 10);
            let n2 = parseInt(v2[i], 10);

            isNaN(n1) && (n1 = 0);
            isNaN(n2) && (n2 = 0);

            if (n1 < n2) {
                return -1;
            } else if (n1 > n2) {
                return 1;
            }
        }
        return 0;
    }

    constructor(version) {
        if (version !== undefined && !isNaN(parseInt(version, 10))) {
            this.version = `${version}`; // 转成字符串格式
        } else {
            this.version = '';
        }
    }

    gt(version) {
        return Version.compare(this.version, version) > 0;
    }

    gte(version) {
        return Version.compare(this.version, version) >= 0;
    }

    lt(version) {
        return Version.compare(this.version, version) < 0;
    }

    lte(version) {
        return Version.compare(this.version, version) <= 0;
    }

    eq(version) {
        return Version.compare(this.version, version) === 0;
    }
}

export const libVersion = pkg.version;

/**
 * @property {string} libVersion - 当前模块的版本号
 * @property {Class} Version - 版本类，其中包含了
 */
export default {
    libVersion,
    Version
};
